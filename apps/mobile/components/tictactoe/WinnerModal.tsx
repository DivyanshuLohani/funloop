import { Modal, View, Text, TouchableOpacity, Image } from "react-native";
import { Colors, Radius, Spacing } from "@/theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import { getFullAssetUrl } from "@/utils/constants";

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
    otherPlayerWantsRematch: boolean;
    onClose: () => void;
    onRematch: () => void;
}

export function WinnerModal({
    visible,
    players,
    winnerId,
    currentUserId,
    hasOtherPlayerLeft,
    otherPlayerWantsRematch,
    onClose,
    onRematch,
}: Props) {
    if (!visible) return null;

    const isDraw = winnerId === "draw";

    const winner = !isDraw
        ? players.find(p => p.id === winnerId)
        : null;

    const losers = !isDraw
        ? players.filter(p => p.id !== winnerId)
        : [];

    const isYouWinner = winnerId === currentUserId;
    const statusText =
        !hasOtherPlayerLeft && otherPlayerWantsRematch
            ? "Opponent Wants Rematch"
            : hasOtherPlayerLeft
                ? "Opponent Left"
                : "";

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
                            backgroundColor: isDraw ? "rgba(255,255,255,0.15)" : isYouWinner ? "rgba(50,255,62,0.15)" : "rgba(255,255,255,0.15)",
                            marginBottom: Spacing.lg,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        {
                            isDraw ? (
                                <Text style={{ color: "#32FF3E", fontWeight: "700", letterSpacing: 1 }}>
                                    🏆 VICTORY
                                </Text>
                            ) : isYouWinner ? (
                                <Text style={{ color: "#32FF3E", fontWeight: "700", letterSpacing: 1 }}>
                                    🏆 VICTORY
                                </Text>
                            ) : (
                                <Text style={{ color: "#FF3232", fontWeight: "700", letterSpacing: 1 }}>
                                    🏆 DEFEAT
                                </Text>
                            )
                        }
                    </View>


                    {/* PLAYERS */}
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: Spacing.xl,
                        }}
                    >
                        {/* DRAW MODE */}
                        {isDraw && (
                            <View style={{ flexDirection: "row", position: "relative" }}>


                                {players.map((player) => (
                                    <View
                                        key={player.id}
                                        style={{ marginHorizontal: Spacing.lg, alignItems: "center" }}
                                    >
                                        <Image
                                            source={{
                                                uri: getFullAssetUrl(
                                                    player.avatar ?? "https://i.pravatar.cc/100"
                                                ),
                                            }}
                                            style={{
                                                width: 72,
                                                height: 72,
                                                borderRadius: 36,
                                            }}
                                        />

                                        <Text
                                            style={{
                                                marginTop: 6,
                                                fontWeight: "700",
                                                color: Colors.textPrimary,
                                            }}
                                        >
                                            {player.id === currentUserId ? "YOU" : player.username}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* WIN / LOSE MODE */}
                        {!isDraw && winner && (
                            <>
                                {/* WINNER CENTER */}
                                <View style={{ alignItems: "center", marginBottom: Spacing.lg }}>
                                    <Text style={{ fontSize: 28, marginBottom: 4 }}>👑</Text>

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
                                            source={{
                                                uri: getFullAssetUrl(
                                                    winner.avatar ?? "https://i.pravatar.cc/100"
                                                ),
                                            }}
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
                                            {winner.id === currentUserId ? "YOU" : winner.username}
                                        </Text>
                                    </View>
                                </View>

                                {/* LOSERS ROW BELOW */}
                                {losers.length > 0 && (
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            gap: Spacing.lg,
                                        }}
                                    >
                                        {losers.map((loser) => (
                                            <View key={loser.id} style={{ opacity: 0.5, alignItems: "center" }}>
                                                <Image
                                                    source={{
                                                        uri: getFullAssetUrl(
                                                            loser.avatar ?? "https://i.pravatar.cc/100"
                                                        ),
                                                    }}
                                                    style={{
                                                        width: 36,
                                                        height: 36,
                                                        borderRadius: 28,
                                                    }}
                                                />
                                                <Text
                                                    style={{
                                                        marginTop: 4,
                                                        fontSize: 12,
                                                        color: Colors.textSecondary,
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {loser.id === currentUserId ? "YOU" : loser.username}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </>
                        )}

                        {statusText ? (
                            <View
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.15)",
                                    padding: Spacing.sm,
                                    borderRadius: Radius.full,
                                    marginTop: Spacing.sm,
                                }}
                            >
                                <Text style={{ color: Colors.textPrimary, fontWeight: "700" }}>
                                    {statusText}
                                </Text>
                            </View>
                        ) : null}
                    </View>

                    {/* Other player wants rematch show a animated popup */}


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
