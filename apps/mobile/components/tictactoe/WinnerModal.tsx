import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Colors, Radius, Spacing } from "@/theme/theme";

interface Props {
    visible: boolean;
    winnerId: string | null;
    isYou: boolean;
    onClose: () => void;
    onRematch: () => void;
}

export function WinnerModal({ visible, winnerId, isYou, onClose, onRematch }: Props) {
    const isDraw = winnerId === "draw";
    return (
        <Modal transparent visible={visible || isDraw} animationType="fade">
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        width: "85%",
                        backgroundColor: Colors.card,
                        borderRadius: Radius.xl,
                        padding: Spacing.xl,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "800",
                            color: Colors.textPrimary,
                            marginBottom: Spacing.md,
                        }}
                    >
                        {isYou && !isDraw ? "🎉 You Won!" : isDraw ? "Draw" : "😔 You Lost"}

                    </Text>

                    {!isDraw && <Text
                        style={{
                            color: Colors.textSecondary,
                            marginBottom: Spacing.lg,
                            textAlign: "center",
                        }}
                    >
                        Winner: {winnerId}
                    </Text>
                    }
                    {/* Add two buttons side by side close and play again */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: Spacing.md }}>
                        <TouchableOpacity
                            onPress={onClose}
                            style={{
                                backgroundColor: Colors.accentBlue,
                                paddingVertical: Spacing.md,
                                paddingHorizontal: Spacing.xl,
                                borderRadius: Radius.full,
                            }}
                        >
                            <Text style={{ color: Colors.textPrimary, fontWeight: "700" }}>
                                Close
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onRematch}
                            style={{
                                backgroundColor: Colors.accentBlue,
                                paddingVertical: Spacing.md,
                                paddingHorizontal: Spacing.xl,
                                borderRadius: Radius.full,
                            }}
                        >
                            <Text style={{ color: Colors.textPrimary, fontWeight: "700" }}>
                                Play Again
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    );
}
