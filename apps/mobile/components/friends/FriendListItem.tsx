import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Spacing, Radius, Typography } from "@/theme/theme";

type Status = "online" | "playing" | "offline";

type Action = "chat" | "invite" | "more";

type Props = {
    name: string;
    level?: number;
    subtitle: string;
    avatar: string;
    status: Status;
    action: Action;
    onPressAction?: () => void;
};

export default function FriendListItem({
    name,
    level,
    subtitle,
    avatar,
    status,
    action,
    onPressAction,
}: Props) {
    const isOffline = status === "offline";

    return (
        <View style={[styles.container, isOffline && styles.containerMuted, { marginBottom: Spacing.sm }]}>
            {/* Avatar */}
            <View style={styles.avatarWrapper}>
                <Image source={{ uri: avatar }} style={styles.avatar} />

                <View
                    style={[
                        styles.statusDot,
                        status === "offline" && styles.statusOffline,
                    ]}
                />
            </View>

            {/* Text Block */}
            <View style={styles.textBlock}>
                <Text style={[styles.name, isOffline && styles.textMuted]}>
                    {name}
                </Text>

                <Text style={styles.subtitle}>
                    {level ? `Lvl. ${level} • ` : ""}
                    {subtitle}
                </Text>
            </View>

            {/* Right Action */}
            {action === "chat" && (
                <Pressable style={styles.chatButton} onPress={onPressAction}>
                    <Text style={styles.chatText}>CHAT</Text>
                </Pressable>
            )}

            {action === "invite" && (
                <View style={styles.inviteRow}>
                    <View style={styles.messageCircle}>
                        <Ionicons name="chatbubble-outline" size={18} color={Colors.textSecondary} />
                    </View>

                    <Pressable style={styles.inviteButton} onPress={onPressAction}>
                        <Text style={styles.inviteText}>INVITE</Text>
                    </Pressable>
                </View>
            )}

            {action === "more" && (
                <View style={styles.moreCircle}>
                    <Ionicons name="ellipsis-horizontal" size={18} color={Colors.textMuted} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: Radius.xl,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
    },

    containerMuted: {
        opacity: 0.5,
    },

    avatarWrapper: {
        marginRight: Spacing.md,
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: Radius.full,
    },

    statusDot: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 14,
        height: 14,
        borderRadius: Radius.full,
        backgroundColor: Colors.accentGreen,
        borderWidth: 2,
        borderColor: Colors.background,
    },

    statusOffline: {
        backgroundColor: Colors.borderLight,
    },

    textBlock: {
        flex: 1,

    },

    name: {
        ...Typography.subtitle,

    },

    subtitle: {
        ...Typography.small,
        marginTop: 2,
    },

    textMuted: {
        color: Colors.textMuted,
    },

    chatButton: {
        backgroundColor: "#C026D3",
        paddingHorizontal: Spacing.lg,
        paddingVertical: 10,
        borderRadius: Radius.full,
    },

    chatText: {
        color: "#fff",
        fontWeight: "700",
        letterSpacing: 0.5,
    },

    inviteRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.sm,
    },

    messageCircle: {
        width: 40,
        height: 40,
        borderRadius: Radius.full,
        backgroundColor: Colors.cardMuted,
        justifyContent: "center",
        alignItems: "center",
    },

    inviteButton: {
        borderWidth: 1,
        borderColor: "#22D3EE",
        paddingHorizontal: Spacing.lg,
        paddingVertical: 9,
        borderRadius: Radius.full,
    },

    inviteText: {
        color: "#22D3EE",
        fontWeight: "700",
    },

    moreCircle: {
        width: 40,
        height: 40,
        borderRadius: Radius.full,
        backgroundColor: Colors.cardMuted,
        justifyContent: "center",
        alignItems: "center",
    },
});
