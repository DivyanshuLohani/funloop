import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/theme/theme";
import { router } from "expo-router";

export function GameHeader() {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 24
        }}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={28} color={Colors.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity>
                <Ionicons name="settings-outline" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
        </View>
    );
}
