import { View, Text } from "react-native";
import { Colors, Radius, Spacing } from "@/theme/theme";

export function TurnIndicator({ text = "Your Turn" }) {
    return (
        <View style={{
            alignSelf: "center",
            backgroundColor: "#32FF3E",
            paddingHorizontal: 24,
            paddingVertical: 10,
            borderRadius: Radius.full,
            marginBottom: 28,
            shadowColor: "#32FF3E",
            shadowOpacity: 0.8,
            shadowRadius: 16
        }}>
            <Text style={{ fontWeight: "700", color: "#003300" }}>
                {text}
            </Text>
        </View>
    );
}
