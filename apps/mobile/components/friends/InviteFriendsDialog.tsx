import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    Pressable,
    TextInput,
    FlatList,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Radius, Typography } from "@/theme/theme";

export type Friend = {
    id: string;
    name: string;
    avatar: string;
    status: "online" | "in_lobby";
    invited?: boolean;
};

type Props = {
    visible: boolean;
    friends: Friend[];
    onClose: () => void;
    onInvite?: (id: string) => void;
    onShareLink?: () => void;
};

export default function InviteFriendsDialog({
    visible,
    friends,
    onClose,
    onInvite,
    onShareLink,
}: Props) {
    const [query, setQuery] = useState("");

    const filtered = friends.filter((f) =>
        f.name.toLowerCase().includes(query.toLowerCase())
    );

    function renderFriend({ item }: { item: Friend }) {
        const invited = item.invited;

        return (
            <View style={styles.friendRow}>
                <View style={styles.avatarWrap}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <View style={styles.onlineDot} />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.status}>
                        {item.status === "in_lobby" ? "IN LOBBY" : "ONLINE"}
                    </Text>
                </View>

                {invited ? (
                    <View style={styles.sentButton}>
                        <Ionicons name="checkmark" size={16} color={Colors.textMuted} />
                        <Text style={styles.sentText}>Sent</Text>
                    </View>
                ) : (
                    <Pressable
                        style={styles.inviteButton}
                        onPress={() => onInvite?.(item.id)}
                    >
                        <Text style={styles.inviteText}>Invite</Text>
                    </Pressable>
                )}
            </View>
        );
    }

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.backdrop}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Invite Friends</Text>
                        <Pressable onPress={onClose}>
                            <Ionicons name="close" size={20} color={Colors.textSecondary} />
                        </Pressable>
                    </View>

                    {/* Search */}
                    <View style={styles.searchBox}>
                        <Ionicons name="search" size={16} color={Colors.textMuted} />
                        <TextInput
                            placeholder="Search friends by name..."
                            placeholderTextColor={Colors.textMuted}
                            value={query}
                            onChangeText={setQuery}
                            style={styles.input}
                        />
                    </View>

                    <Text style={styles.sectionLabel}>
                        ONLINE FRIENDS — {filtered.length}
                    </Text>

                    {/* List */}
                    <FlatList
                        data={filtered}
                        keyExtractor={(item) => item.id}
                        renderItem={renderFriend}
                        contentContainerStyle={{ paddingBottom: Spacing.lg }}
                    />

                    {/* Share Link */}
                    <Pressable style={styles.shareRow} onPress={onShareLink}>
                        <View style={styles.shareIcon}>
                            <Ionicons name="link" size={18} color="#fff" />
                        </View>
                        <Text style={styles.shareText}>Share Invite Link</Text>
                        <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: Spacing.lg,
    },

    container: {
        width: "100%",
        backgroundColor: Colors.card,
        borderRadius: Radius.xl,
        padding: Spacing.lg,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Spacing.md,
    },

    title: {
        ...Typography.title,
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.cardMuted,
        borderRadius: Radius.full,
        paddingHorizontal: Spacing.md,
        height: 44,
        marginBottom: Spacing.md,
        gap: Spacing.sm,
    },

    input: {
        flex: 1,
        color: Colors.textPrimary,
    },

    sectionLabel: {
        color: Colors.textMuted,
        fontSize: 12,
        letterSpacing: 1,
        marginBottom: Spacing.sm,
    },

    friendRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Spacing.md,
    },

    avatarWrap: {
        marginRight: Spacing.md,
    },

    avatar: {
        width: 44,
        height: 44,
        borderRadius: Radius.full,
    },

    onlineDot: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 12,
        height: 12,
        borderRadius: Radius.full,
        backgroundColor: Colors.accentGreen,
        borderWidth: 2,
        borderColor: Colors.card,
    },

    name: {
        color: Colors.textPrimary,
        fontWeight: "600",
    },

    status: {
        color: Colors.accentGreen,
        fontSize: 12,
        marginTop: 2,
    },

    inviteButton: {
        backgroundColor: "#C026D3",
        paddingHorizontal: Spacing.lg,
        paddingVertical: 8,
        borderRadius: Radius.full,
    },

    inviteText: {
        color: "#fff",
        fontWeight: "700",
    },

    sentButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: Colors.cardMuted,
        paddingHorizontal: Spacing.md,
        paddingVertical: 8,
        borderRadius: Radius.full,
    },

    sentText: {
        color: Colors.textMuted,
        fontWeight: "600",
    },

    shareRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: Colors.borderLight,
        borderRadius: Radius.lg,
        padding: Spacing.md,
        marginTop: Spacing.sm,
    },

    shareIcon: {
        width: 32,
        height: 32,
        borderRadius: Radius.full,
        backgroundColor: "#C026D3",
        justifyContent: "center",
        alignItems: "center",
    },

    shareText: {
        flex: 1,
        color: Colors.textPrimary,
        marginLeft: Spacing.sm,
    },
});
