import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { getSocket } from "@/services/socket";
import { useAuth } from "@/hooks/useAuth";

export default function Matchmaking() {
    const [status, setStatus] = useState("Waiting in queue...");
    const [opponent, setOpponent] = useState<string | null>("");
    const auth = useAuth();

    useEffect(() => {
        const socket = getSocket();
        const userId = auth?.user?.id;

        if (!socket || !userId) return;

        socket.on("MATCH_FOUND", ({ roomId, players }: { roomId: string; players: string[] }) => {
            setStatus("Match Found!");
            const opp = players.find((p) => p !== userId);

            setOpponent(opp ?? "");

            // // navigate to game screen after short delay
            // setTimeout(() => {
            //     router.replace({
            //         pathname: "..",
            //         params: { roomId }
            //     });
            // }, 1200);
        });

        return () => {
            socket.off("MATCH_FOUND");
        };
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text style={styles.text}>{status}</Text>

            {opponent && (
                <Text style={styles.subText}>Opponent: {opponent}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#000"
    },
    text: {
        color: "#fff",
        fontSize: 22,
        marginTop: 20
    },
    subText: {
        color: "#aaa",
        fontSize: 16,
        marginTop: 8
    }
});
