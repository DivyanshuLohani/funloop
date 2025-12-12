import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { getSocket } from "@/services/socket";
import { Colors } from "@/theme/theme";

import { GameHeader } from "@/components/tictactoe/GameHeader";
import { ScoreBar } from "@/components/tictactoe/ScoreBar";
import { TurnIndicator } from "@/components/tictactoe/TurnIndicator";
import { TicTacToeBoard } from "@/components/tictactoe/Board";
import { WinnerModal } from "@/components/tictactoe/WinnerModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { TicTacToeState } from "@funloop/game-core";
import { useAuth } from "@/hooks/useAuth";

export default function GameScreen() {
    const { roomId } = useLocalSearchParams();
    const socket = getSocket();
    const auth = useAuth();

    const [gameState, setGameState] = useState<TicTacToeState | null>(null);
    const [status, setStatus] = useState("Waiting for players...");
    const [showWinner, setShowWinner] = useState(false);

    useEffect(() => {
        if (!socket) return;

        socket.emit("DEVICE_READY", { roomId });

        socket.on("ALL_READY", () => {
            setStatus("All players ready...");
        });

        socket.on("GAME_START", ({ state }) => {
            setStatus("Game Started");
            setGameState(state);
        });

        socket.on("GAME_STATE_UPDATE", (state) => {
            setGameState(state);
        });

        socket.on("PLAYER_LEFT", ({ userId }) => {
            setStatus(`Player ${userId} left`);
        });

        return () => {
            socket.off("ALL_READY");
            socket.off("GAME_START");
            socket.off("GAME_STATE_UPDATE");
            socket.off("PLAYER_LEFT");

            socket.emit("LEAVE_ROOM", { roomId });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId]);

    // 🟢 Winner detection (runs once)
    useEffect(() => {
        if (gameState?.winner && !showWinner) {
            setShowWinner(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState?.winner]);

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.background, padding: 20 }}
        >
            <GameHeader />

            <ScoreBar you={2} rival={1} />

            <TurnIndicator
                text={
                    gameState?.turn === auth?.user?.id
                        ? "Your Turn"
                        : "Waiting for rival"
                }
            />

            {gameState ? (
                <TicTacToeBoard
                    board={gameState.board}
                    disabled={gameState.turn !== auth?.user?.id || !!gameState.winner}
                    onPress={(index) => {
                        socket?.emit("PLAYER_ACTION", { roomId, index });
                    }}
                />
            ) : (
                <Text
                    style={{ color: Colors.textSecondary, textAlign: "center" }}
                >
                    {status}
                </Text>
            )}

            {/* 🏆 Winner Modal */}
            <WinnerModal
                visible={showWinner}
                winnerId={gameState?.winner ?? null}
                isYou={gameState?.winner === auth?.user?.id}
                onClose={() => setShowWinner(false)}
            />
        </SafeAreaView>
    );
}
