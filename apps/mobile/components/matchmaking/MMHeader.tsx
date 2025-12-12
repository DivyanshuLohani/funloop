import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Typography, Spacing } from "../../theme/theme";

export default function MMHeader({ onClose }: { onClose: () => void }) {
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: Spacing.xl,
        }}>
            <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={32} color={Colors.textPrimary} />
            </TouchableOpacity>

            <Text style={Typography.title}>Matchmaking</Text>

            {/* placeholder for spacing */}
            <View style={{ width: 32 }} />
        </View>
    );
}
