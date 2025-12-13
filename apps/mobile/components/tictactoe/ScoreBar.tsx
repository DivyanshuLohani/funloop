import { View, Text, Image } from "react-native";
import { Colors, Radius, Spacing } from "@/theme/theme";
import { useAuth } from "@/hooks/useAuth";

export type PlayerSnapshot = {
    id: string;
    username: string;
    avatar: string | null;
    games: number;
    wins: number;
    isGuest: boolean;
    score?: number;
};

export type PlayerMap = Record<string, PlayerSnapshot>;

export function ScoreBar({ playerMap }: { playerMap: PlayerMap }) {
    const auth = useAuth();
    const myId = auth?.user?.id;

    const players = Object.values(playerMap);

    const me = players.find(p => p.id === myId);
    const rival = players.find(p => p.id !== myId);

    if (!me || !rival) return null;

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
                        uri: me.avatar ?? "https://i.pravatar.cc/100",
                    }}
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        marginRight: 8,
                    }}
                />

                <View>
                    <Text
                        style={{
                            color: Colors.textPrimary,
                            fontWeight: "600",
                        }}
                    >
                        You
                    </Text>


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
                    <Text
                        style={{
                            color: Colors.textPrimary,
                            fontWeight: "600",
                        }}
                    >
                        {rival.username}
                    </Text>


                </View>

                <Image
                    source={{
                        uri: rival.avatar ?? "https://i.pravatar.cc/100?img=5",
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
