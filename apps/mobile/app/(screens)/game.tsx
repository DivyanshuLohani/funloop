import { Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
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
import { useMatch } from "@/context/MatchContext";

export default function GameScreen() {
    const { roomId } = useLocalSearchParams();
    const socket = getSocket();
    const auth = useAuth();
    const { playersMap, setMatch } = useMatch();


    const [gameState, setGameState] = useState<TicTacToeState | null>(null);
    const [status, setStatus] = useState("Waiting for players...");
    const [showWinner, setShowWinner] = useState(false);
    const [waitingForRematch, setWaitingForRematch] = useState(false);
    const [hasOtherPlayerLeft, setHasOtherPlayerLeft] = useState(false);

    useEffect(() => {
        if (!socket) return;

        socket.emit("DEVICE_READY", { roomId });

        socket.on("ALL_READY", () => {
            setStatus("All players ready...");
        });

        socket.on("REMATCH_STATUS", ({ accepted, total }) => {
            setWaitingForRematch(true);
        });

        socket.on("REMATCH_START", ({ state }) => {
            setGameState(state);
            setShowWinner(false);
            setWaitingForRematch(false);

        });


        socket.on("GAME_START", ({ state, playersMap: serverMap }) => {
            setGameState(state);

            if (serverMap) {
                setMatch({
                    roomId: roomId as string,
                    playersMap: serverMap
                });
            }
        });

        socket.on("GAME_STATE_UPDATE", (state) => {
            setGameState(state);
        });

        socket.on("PLAYER_LEFT", ({ userId }) => {
            setStatus(`Player ${userId} left`);
            setHasOtherPlayerLeft(true);

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

            <ScoreBar playerMap={playersMap ?? {}} />


            {!waitingForRematch && <TurnIndicator
                text={
                    gameState?.turn === auth?.user?.id
                        ? "Your Turn"
                        : "Waiting for rival"
                }
            />}
            {waitingForRematch && <TurnIndicator
                text={
                    "Waiting for rival to accept rematch"
                }
            />}
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
                currentUserId={auth?.user?.id ?? ""}
                players={playersMap ? Object.values(playersMap) : []}
                onClose={() => {
                    setShowWinner(false);
                    router.replace({
                        pathname: "/(drawer)/home"
                    });
                }}
                hasOtherPlayerLeft={hasOtherPlayerLeft}
                onRematch={() => {
                    setShowWinner(false);
                    socket?.emit("REQUEST_REMATCH", { roomId });
                }}
            />
        </SafeAreaView>
    );
}
