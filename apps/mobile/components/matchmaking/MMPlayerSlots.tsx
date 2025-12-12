import { View, Text } from "react-native";
import { Colors, Spacing, Radius } from "../../theme/theme";
import { Ionicons } from "@expo/vector-icons";


export default function MMPlayerSlots({ total = 4, found = 2 }) {
    const slots = Array.from({ length: total });

    return (
        <View style={{ alignItems: "center", marginBottom: Spacing.md }}>
            <Text style={{ color: Colors.textPrimary, fontSize: 20, fontWeight: "700", marginBottom: 20 }}>
                Finding players…
            </Text>

            <View style={{ flexDirection: "row", gap: 16, marginBottom: 20 }}>
                {slots.map((_, index) => {
                    const isFilled = index < found;

                    return (
                        <View
                            key={index}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: Radius.full,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: isFilled
                                    ? index === 0
                                        ? Colors.accentBlue
                                        : Colors.accentGreen
                                    : "transparent",
                                borderWidth: isFilled ? 0 : 2,
                                borderColor: "#8B8FA8",
                                opacity: isFilled ? 1 : 0.4,
                            }}
                        >
                            {isFilled ? (
                                <Ionicons name="person" size={28} color="white" />
                            ) : (
                                <Ionicons name="person-add-outline" size={28} color="#8B8FA8" />
                            )}
                        </View>
                    );
                })}
            </View>

            <Text style={{ color: Colors.textSecondary }}>
                {found}/{total} players found
            </Text>
        </View>
    );
}
