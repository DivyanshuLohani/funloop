import { View, Text, Image } from "react-native";
import { Colors, Radius, Spacing } from "@/theme/theme";
import { useAuth } from "@/hooks/useAuth";
import { PlayerSnapshot } from "@funloop/types";
import { getFullAssetUrl } from "@/utils/constants";


export type PlayerMap = Record<string, PlayerSnapshot>;

export function ScoreBar({ playerMap }: { playerMap: PlayerMap }) {
    const auth = useAuth();
    const myId = auth?.user?.id;

    const players = Object.values(playerMap);

    if (players.length < 2) return null;

    const getSymbol = (playerId: string) => {
        const index = players.findIndex(p => p.id === playerId);
        return index === 0 ? "X" : "O";
    };

    const getSymbolColor = (symbol: "X" | "O") =>
        symbol === "X" ? "#5BFF5B" : "#B14CFF";

    const me = players.find(p => p.id === myId);
    const rival = players.find(p => p.id !== myId);

    if (!me || !rival) return null;

    const mySymbol = getSymbol(me.id);
    const rivalSymbol = getSymbol(rival.id);

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
            }}
        >
            {/* YOU */}
            <View
                style={{
                    backgroundColor: "#1B2A6B",
                    borderRadius: Radius.xl,
                    padding: Spacing.md,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Image
                    source={{
                        uri: getFullAssetUrl(me.avatar ?? "https://i.pravatar.cc/100"),
                    }}
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        marginRight: 8,
                    }}
                />

                <View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                            style={{
                                color: Colors.textPrimary,
                                fontWeight: "600",
                                marginRight: 6,
                            }}
                        >
                            You
                        </Text>

                        {/* X / O badge */}
                        <View
                            style={{
                                width: 22,
                                height: 22,
                                borderRadius: 11,
                                backgroundColor: getSymbolColor(mySymbol),
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#000",
                                    fontWeight: "800",
                                    fontSize: 12,
                                }}
                            >
                                {mySymbol}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* RIVAL */}
            <View
                style={{
                    backgroundColor: "#141A3A",
                    borderRadius: Radius.xl,
                    padding: Spacing.md,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View style={{ marginRight: 8 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                            style={{
                                color: Colors.textPrimary,
                                fontWeight: "600",
                                marginRight: 6,
                            }}
                        >
                            {rival.username}
                        </Text>

                        {/* X / O badge */}
                        <View
                            style={{
                                width: 22,
                                height: 22,
                                borderRadius: 11,
                                backgroundColor: getSymbolColor(rivalSymbol),
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#000",
                                    fontWeight: "800",
                                    fontSize: 12,
                                }}
                            >
                                {rivalSymbol}
                            </Text>
                        </View>
                    </View>
                </View>

                <Image
                    source={{
                        uri: getFullAssetUrl(rival.avatar ?? "https://i.pravatar.cc/100?img=5"),
                    }}
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                    }}
                />
            </View>
        </View>
    );
}
