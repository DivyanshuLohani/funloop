import { TouchableOpacity, Text } from "react-native";
import { Colors, Radius, Spacing } from "../../theme/theme";

export default function MMCancelButton({ onCancel }: { onCancel: () => void }) {
    return (
        <TouchableOpacity
            onPress={onCancel}
            style={{
                width: "100%",
                paddingVertical: Spacing.md,
                borderRadius: Radius.xl,
                backgroundColor: "rgba(255,255,255,0.15)",
                alignItems: "center",
            }}
        >
            <Text style={{ color: Colors.textPrimary, fontSize: 18, fontWeight: "600" }}>
                Cancel
            </Text>
        </TouchableOpacity>
    );
}
