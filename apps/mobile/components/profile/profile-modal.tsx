import React, { useEffect } from "react";
import {
    Modal,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
} from "react-native";
import { Colors, Radius, Spacing } from "@/theme/theme";
import { Animations } from "@/theme/animations";
import { Ionicons } from "@expo/vector-icons";




type Badge = {
    id: string;
    label: string;
    icon: React.ReactNode;
};

interface PlayerProfileModalProps {
    visible: boolean;
    onClose: () => void;

    username: string;
    avatar: string | null;
    isOnline: boolean;

    level: number;
    isPro: boolean;

    wins: number;
    streak: number;
    rank: string;

    badges: Badge[];
    onAddFriend?: () => void;
    onMessage?: () => void;
}

export function PlayerProfileModal({
    visible,
    onClose,
    username,
    avatar,
    isOnline,
    level,
    isPro,
    wins,
    streak,
    rank,
    badges,
    onAddFriend,
    onMessage,
}: PlayerProfileModalProps) {
    const scale = React.useRef(new Animated.Value(1)).current;
    const opacity = React.useRef(new Animated.Value(1)).current;
    const avatarGlow = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animations.modalEnter(scale, opacity).start();
            Animations.avatarPulse(avatarGlow).start();
        }
    }, [avatarGlow, opacity, scale, visible]);

    if (!visible) return null;

    return (
        <Modal backdropColor={"#000000aa"} animationType="slide" onDismiss={onClose} onRequestClose={onClose}>

            <View
                style={{
                    flex: 1,

                    justifyContent: "center",

                }}
            >
                <Animated.View
                    style={{
                        transform: [{ scale }],
                        opacity,

                        backgroundColor: Colors.card,
                        borderRadius: Radius.xl,
                        padding: Spacing.xl,
                    }}
                >

                    {/* CLOSE */}
                    <TouchableOpacity
                        onPress={onClose}
                        style={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            zIndex: 10,
                            backgroundColor: "rgba(255,255,255,0.08)",
                            borderRadius: Radius.full,
                            padding: 8,
                        }}
                    >
                        <Ionicons name="close" size={20} color={Colors.textPrimary} />
                    </TouchableOpacity>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* AVATAR */}
                        <View style={{ alignItems: "center", marginBottom: Spacing.lg }}>
                            <Animated.View

                                style={{
                                    width: 96,
                                    height: 96,
                                    borderRadius: 48,
                                    backgroundColor: Colors.background,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    shadowColor: Colors.accentBlue,
                                    shadowOpacity: avatarGlow,
                                    shadowRadius: 20,
                                }}
                            >
                                <Image
                                    source={{
                                        uri: avatar ?? "https://i.pravatar.cc/200",
                                    }}
                                    style={{
                                        width: 88,
                                        height: 88,
                                        borderRadius: 44,
                                    }}
                                />

                                {/* ONLINE DOT */}
                                {isOnline && (
                                    <View
                                        style={{
                                            position: "absolute",
                                            bottom: 6,
                                            right: 6,
                                            width: 14,
                                            height: 14,
                                            borderRadius: 7,
                                            backgroundColor: "#3CFF6D",
                                            borderWidth: 2,
                                            borderColor: Colors.card,
                                        }}
                                    />
                                )}
                            </Animated.View>

                            <Text
                                style={{
                                    color: Colors.textPrimary,
                                    fontSize: 22,
                                    fontWeight: "800",
                                    marginTop: Spacing.md,
                                }}
                            >
                                @{username}
                            </Text>

                            {/* TAGS */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: Spacing.sm,
                                    gap: 8,
                                }}
                            >
                                {isPro && (
                                    <View
                                        style={{
                                            paddingHorizontal: 12,
                                            paddingVertical: 4,
                                            borderRadius: Radius.full,
                                            backgroundColor: "rgba(255,255,255,0.1)",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: Colors.textSecondary,
                                                fontWeight: "700",
                                                fontSize: 12,
                                            }}
                                        >
                                            PRO PLAYER
                                        </Text>
                                    </View>
                                )}

                                <View
                                    style={{
                                        paddingHorizontal: 12,
                                        paddingVertical: 4,
                                        borderRadius: Radius.full,
                                        backgroundColor: Colors.accentBlue,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontWeight: "800",
                                            fontSize: 12,
                                        }}
                                    >
                                        LVL {level}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* ACTIONS */}
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 12,
                                marginBottom: Spacing.lg,
                            }}
                        >
                            <TouchableOpacity
                                onPress={onAddFriend}
                                style={{
                                    flex: 1,
                                    backgroundColor: Colors.accentBlue,
                                    borderRadius: Radius.full,
                                    paddingVertical: Spacing.md,
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <Ionicons name="person-add" size={18} color="#fff" />
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontWeight: "700",
                                        marginLeft: 8,
                                    }}
                                >
                                    Add Friend
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={onMessage}
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: Radius.full,
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Ionicons name="chatbubble" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {/* BADGES */}
                        <View style={{ marginBottom: Spacing.lg }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: Spacing.md,
                                }}
                            >
                                <Text
                                    style={{
                                        color: Colors.textPrimary,
                                        fontSize: 18,
                                        fontWeight: "700",
                                    }}
                                >
                                    Badges
                                </Text>

                                <Text
                                    style={{
                                        color: Colors.accentBlue,
                                        fontWeight: "700",
                                    }}
                                >
                                    SEE ALL
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                {badges.slice(0, 4).map((badge: any) => (
                                    <View key={badge.id} style={{ alignItems: "center" }}>
                                        <View
                                            style={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: 28,
                                                backgroundColor: "rgba(255,255,255,0.08)",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginBottom: 6,
                                            }}
                                        >
                                            {badge.icon}
                                        </View>
                                        <Text
                                            style={{
                                                color: Colors.textSecondary,
                                                fontSize: 12,
                                            }}
                                        >
                                            {badge.label}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* STATS */}
                        <View>
                            <Text
                                style={{
                                    color: Colors.textPrimary,
                                    fontSize: 18,
                                    fontWeight: "700",
                                    marginBottom: Spacing.md,
                                }}
                            >
                                Stats
                            </Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 12,
                                    marginBottom: 12,
                                }}
                            >
                                <StatCard label="WINS" value={wins} />
                                <StatCard label="STREAK" value={streak} />
                            </View>

                            <View
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.06)",
                                    borderRadius: Radius.lg,
                                    padding: Spacing.md,
                                }}
                            >
                                <Text
                                    style={{
                                        color: Colors.textSecondary,
                                        fontWeight: "700",
                                        marginBottom: 4,
                                    }}
                                >
                                    CURRENT RANK
                                </Text>

                                <Text
                                    style={{
                                        color: Colors.textPrimary,
                                        fontSize: 22,
                                        fontWeight: "800",
                                    }}
                                >
                                    {rank}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>

                </Animated.View>
            </View>
        </Modal>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "rgba(255,255,255,0.06)",
                borderRadius: Radius.lg,
                padding: Spacing.md,
            }}
        >
            <Text
                style={{
                    color: Colors.textSecondary,
                    fontWeight: "700",
                    marginBottom: 4,
                }}
            >
                {label}
            </Text>

            <Text
                style={{
                    color: Colors.textPrimary,
                    fontSize: 24,
                    fontWeight: "800",
                }}
            >
                {value}
            </Text>
        </View>
    );
}
