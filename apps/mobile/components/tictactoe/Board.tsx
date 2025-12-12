import { View, TouchableOpacity, Text } from "react-native";
import { Radius } from "@/theme/theme";
import { Cell } from "@funloop/game-core";

interface Props {
    board: Cell[]; // length = 9
    onPress: (index: number) => void;
    disabled?: boolean;
}

export function TicTacToeBoard({
    board,
    onPress,
    disabled = false,
}: Props) {
    return (
        <View
            style={{
                alignSelf: "center",
                marginBottom: 40,
            }}
        >
            {[0, 1, 2].map((row) => (
                <View
                    key={row}
                    style={{
                        flexDirection: "row",
                    }}
                >
                    {[0, 1, 2].map((col) => {
                        const index = row * 3 + col;
                        const cell = board[index];

                        return (
                            <TouchableOpacity
                                key={index}
                                disabled={disabled || !!cell}
                                onPress={() => onPress(index)}
                                activeOpacity={0.7}
                                style={{
                                    width: 80,
                                    height: 80,
                                    margin: 6,
                                    borderRadius: Radius.lg,
                                    backgroundColor: "#10163A",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {cell !== null && (
                                    <Text
                                        style={{
                                            fontSize: 42,
                                            fontWeight: "700",
                                            color:
                                                cell === "X"
                                                    ? "#5BFF5B" // green X
                                                    : "#B14CFF", // purple O
                                        }}
                                    >
                                        {cell}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}
