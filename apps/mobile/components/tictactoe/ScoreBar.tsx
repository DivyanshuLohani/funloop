import { View, Text, Image } from "react-native";
import { Colors, Radius, Spacing } from "@/theme/theme";

export function ScoreBar({ you = 0, rival = 0 }) {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20
        }}>
            <View style={{
                backgroundColor: "#1B2A6B",
                borderRadius: Radius.xl,
                padding: Spacing.md,
                flexDirection: "row",
                alignItems: "center"
            }}>
                <Image
                    source={{ uri: "https://i.pravatar.cc/100" }}
                    style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
                />
                <View>
                    <Text style={{ color: Colors.textPrimary, fontWeight: "600" }}>You</Text>
                    <Text style={{ color: Colors.textSecondary }}>Score: {you}</Text>
                </View>
            </View>

            <View style={{
                backgroundColor: "#141A3A",
                borderRadius: Radius.xl,
                padding: Spacing.md,
                flexDirection: "row",
                alignItems: "center"
            }}>
                <View style={{ marginRight: 8 }}>
                    <Text style={{ color: Colors.textPrimary, fontWeight: "600" }}>Rival</Text>
                    <Text style={{ color: Colors.textSecondary }}>Score: {rival}</Text>
                </View>
                <Image
                    source={{ uri: "https://i.pravatar.cc/100?img=5" }}
                    style={{ width: 36, height: 36, borderRadius: 18 }}
                />
            </View>
        </View>
    );
}
