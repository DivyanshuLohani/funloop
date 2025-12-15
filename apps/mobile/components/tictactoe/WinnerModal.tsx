import { Modal, View, Text, TouchableOpacity, Image } from "react-native";
import { Colors, Radius, Spacing } from "@/theme/theme";
import { LinearGradient } from "expo-linear-gradient";

type Player = {
    id: string;
    username: string;
    avatar: string | null;
};

interface Props {
    visible: boolean;
    players: Player[];
    winnerId: string | null; // userId | "draw"
    currentUserId: string;
    hasOtherPlayerLeft: boolean;
    onClose: () => void;
    onRematch: () => void;
}

export function WinnerModal({
    visible,
    players,
    winnerId,
    currentUserId,
    hasOtherPlayerLeft,
    onClose,
    onRematch,
}: Props) {
    if (!visible) return null;

    const isDraw = winnerId === "draw";
    const winner = players.find(p => p.id === winnerId);
    const isYouWinner = winnerId === currentUserId;

    const otherPlayers = players.filter(p => p.id !== winnerId);

    return (
        <Modal transparent animationType="fade">
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.75)",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {/* CARD */}
                <LinearGradient
                    colors={[Colors.gradientStart, Colors.gradientEnd]}
                    style={{
                        width: "90%",
                        borderRadius: Radius.xl,
                        padding: Spacing.xl,
                        alignItems: "center",
                    }}
                >
                    {/* BADGE */}
                    <View
                        style={{
                            paddingHorizontal: Spacing.lg,
                            paddingVertical: Spacing.sm,
                            borderRadius: Radius.full,
                            backgroundColor: "rgba(50,255,62,0.15)",
                            marginBottom: Spacing.lg,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "#32FF3E", fontWeight: "700", letterSpacing: 1 }}>
                            🏆 VICTORY
                        </Text>
                    </View>

                    {/* TITLE */}
                    <Text
                        style={{
                            fontSize: 40,
                            fontWeight: "900",
                            color: Colors.textPrimary,
                            marginBottom: Spacing.xl,
                            textAlign: "center",
                        }}
                    >
                        {isDraw ? "DRAW" : isYouWinner ? "YOU WIN!" : "YOU LOSE"}
                    </Text>

                    {/* PLAYERS ROW */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: Spacing.xl,
                        }}
                    >
                        {/* LEFT PLAYER */}
                        {otherPlayers[0] && (
                            <View style={{ opacity: 0.5 }}>
                                <Image
                                    source={{ uri: otherPlayers[0].avatar ?? "https://i.pravatar.cc/100" }}
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 28,
                                    }}
                                />
                            </View>
                        )}

                        {/* WINNER */}
                        <View
                            style={{
                                marginHorizontal: Spacing.lg,
                                alignItems: "center",
                            }}
                        >
                            {/* CROWN */}
                            {!isDraw && (
                                <Text style={{ fontSize: 28, marginBottom: 4 }}>👑</Text>
                            )}

                            <View
                                style={{
                                    width: 88,
                                    height: 88,
                                    borderRadius: 44,
                                    backgroundColor: Colors.accentGreen,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={{ uri: winner?.avatar ?? "https://i.pravatar.cc/100" }}
                                    style={{
                                        width: 72,
                                        height: 72,
                                        borderRadius: 36,
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    marginTop: 6,
                                    paddingHorizontal: 12,
                                    paddingVertical: 4,
                                    borderRadius: Radius.full,
                                    backgroundColor: Colors.accentGreen,
                                }}
                            >
                                <Text style={{ fontWeight: "700", color: "#003300" }}>
                                    {winner?.id === currentUserId ? "YOU" : winner?.username}
                                </Text>
                            </View>
                        </View>

                        {/* RIGHT PLAYER */}
                        {otherPlayers[1] && (
                            <View style={{ opacity: 0.5 }}>
                                <Image
                                    source={{ uri: otherPlayers[1].avatar ?? "https://i.pravatar.cc/100" }}
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 28,
                                    }}
                                />
                            </View>
                        )}
                    </View>

                    {/* PLAY AGAIN */}
                    <TouchableOpacity
                        disabled={hasOtherPlayerLeft}
                        onPress={onRematch}
                        style={{
                            width: "100%",
                            paddingVertical: Spacing.lg,
                            borderRadius: Radius.full,
                            backgroundColor: hasOtherPlayerLeft
                                ? "rgba(255,255,255,0.15)"
                                : Colors.accentBlue,
                            alignItems: "center",
                            marginBottom: Spacing.md,
                            opacity: hasOtherPlayerLeft ? 0.5 : 1,
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.textPrimary,
                                fontSize: 18,
                                fontWeight: "800",
                            }}
                        >
                            Play Again
                        </Text>
                    </TouchableOpacity>

                    {/* CLOSE */}
                    <TouchableOpacity
                        onPress={onClose}
                        style={{
                            width: "100%",
                            paddingVertical: Spacing.md,
                            borderRadius: Radius.full,
                            backgroundColor: "rgba(255,255,255,0.08)",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.textSecondary,
                                fontSize: 16,
                                fontWeight: "600",
                            }}
                        >
                            Close
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </Modal>
    );
}
