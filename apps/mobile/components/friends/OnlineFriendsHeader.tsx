import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Colors, Spacing, Radius, Typography } from "@/theme/theme"; // adjust path

type Props = {
    title: string;
    onlineCount?: number;
};

export default function SectionHeader({ title, onlineCount }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {onlineCount !== undefined && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{onlineCount} Online</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Spacing.md,
    },

    title: {
        ...Typography.subtitle,
    },

    badge: {
        backgroundColor: "rgba(124, 58, 237, 0.18)", // soft purple w/ low alpha
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: Radius.md,
        justifyContent: "center",
        alignItems: "center",
    },

    badgeText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#C4B5FD", // readable but not neon
        letterSpacing: 0.3,
    },
});
