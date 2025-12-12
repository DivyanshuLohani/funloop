import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Radius } from "@/theme/theme";

export function ActionBar() {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <TouchableOpacity>
                <Ionicons name="chatbubble-outline" size={28} color={Colors.textPrimary} />
            </TouchableOpacity>

            <View style={{
                width: 90,
                height: 90,
                borderRadius: Radius.full,
                backgroundColor: "#39FF14",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#39FF14",
                shadowOpacity: 0.9,
                shadowRadius: 30
            }}>
                <Ionicons name="dice-outline" size={36} color="#003300" />
            </View>

            <View style={{ width: 28 }} />
        </View>
    );
}
