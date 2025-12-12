import { View } from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Colors, Radius } from "../../theme/theme";

interface Props {
    gameType?: string;
}

export default function MMGameTypeIcon({ gameType = "search" }: Props) {
    let IconComponent = Ionicons;
    let iconName: string = "search";
    let bgColor: string = Colors.accentBlue;

    switch (gameType.toLowerCase()) {
        case "tictactoe":
            // @ts-ignore
            IconComponent = MaterialCommunityIcons;
            iconName = "tic-tac-toe";
            bgColor = "#4CAF50"; // green-ish for tic tac toe
            break;

        case "ludo":
            IconComponent = FontAwesome5;
            iconName = "dice";
            bgColor = "#3BA3FF"; // blue gradient tone
            break;

        case "chess":
            IconComponent = FontAwesome5;
            iconName = "chess";
            bgColor = "#8C6FF7"; // purple
            break;

        default:
            IconComponent = Ionicons;
            iconName = "search";
            bgColor = Colors.accentBlue;
            break;
    }

    return (
        <View
            style={{
                width: 150,
                height: 150,
                borderRadius: Radius.full,
                backgroundColor: bgColor,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginBottom: 40,
            }}
        >
            <IconComponent name={iconName as any} size={60} color="white" />
        </View>
    );
}
