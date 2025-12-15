import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/hooks/useAuth";
import { getSocket } from "@/services/socket";

import MMHeader from "@/components/matchmaking/MMHeader";
import MMPlayerSlots from "@/components/matchmaking/MMPlayerSlots";
import MMProgressBar from "@/components/matchmaking/MMProgressBar";
import MMCancelButton from "@/components/matchmaking/MMCancelButton";

import { Colors, Spacing } from "@/theme/theme";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MMGameTypeIcon from "@/components/matchmaking/MMGameTypeIcon";
import { useMatch } from "@/context/MatchContext";
import { PlayerSnapshot } from "@funloop/types";

export default function MatchmakingScreen() {
    const auth = useAuth();
    const userId = auth?.user?.id;
    const { gameType, players } = useLocalSearchParams();
    const [playersFound, setPlayersFound] = useState(1); // at least yourself
    const totalPlayers = Number(players) || 2;
    const { setMatch } = useMatch();

    useEffect(() => {
        const socket = getSocket();
        if (!socket || !userId) return;

        // Listen for match found
        socket.on("MATCH_FOUND", ({ roomId, players, playerMap }) => {
            // Count players found
            setPlayersFound(players.length);
            setMatch({ roomId, playersMap: playerMap as Record<string, PlayerSnapshot> });
            // Navigate after short delay
            setTimeout(() => {
                router.replace({
                    pathname: "/game",
                    params: { roomId, playerMap }
                });
            }, 1200);
        });

        return () => {
            socket.off("MATCH_FOUND");
            socket.emit("LEAVE_QUEUE", { gameType: gameType as string });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>

            <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                style={{ flex: 1, padding: Spacing.lg }}
            >
                {/* Top Header */}
                <MMHeader onClose={() => router.back()} />

                <MMGameTypeIcon gameType={gameType as string} />

                {/* Players Loading UI */}
                <MMPlayerSlots
                    total={totalPlayers}
                    found={playersFound}
                />

                {/* Progress Bar */}
                <MMProgressBar
                    total={totalPlayers}
                    found={playersFound}
                />

                {/* Cancel Button */}
                <MMCancelButton
                    onCancel={() => router.back()}
                />
            </LinearGradient>
        </SafeAreaView>
    );
}
