import { View } from "react-native";
import { Colors, Radius } from "../../theme/theme";

export default function MMProgressBar({ total = 4, found = 2 }) {
    const progress = found / total;

    return (
        <View
            style={{
                height: 10,
                width: "100%",
                backgroundColor: "#14204A",
                borderRadius: Radius.lg,
                marginTop: 20,
                marginBottom: 50,
                overflow: "hidden",
            }}
        >
            <View
                style={{
                    height: "100%",
                    width: `${progress * 100}%`,
                    backgroundColor: Colors.accentGreen,
                }}
            />
        </View>
    );
}
