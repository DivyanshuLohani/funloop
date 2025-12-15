import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { PlayerProfileModal } from "@/components/profile/profile-modal";
import { Colors, Spacing } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { getFullAssetUrl } from "@/utils/constants";

export default function ProfilePreviewDemo() {
    const [open, setOpen] = useState(false);
    const { user } = useAuth();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.background,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                    backgroundColor: Colors.accentBlue,
                    paddingHorizontal: Spacing.xl,
                    paddingVertical: Spacing.md,
                    borderRadius: 999,
                }}
            >
                <Text style={{ color: "#fff", fontWeight: "700" }}>
                    Open Profile Modal
                </Text>
            </TouchableOpacity>

            <PlayerProfileModal
                visible={open}
                onClose={() => setOpen(false)}
                username={user?.username ?? ""}
                avatar={getFullAssetUrl(user?.avatar ?? "")}
                isOnline={true}
                level={42}
                isPro={true}
                wins={125}
                streak={12}
                rank="Gold III"
                badges={[
                    {
                        id: "speed",
                        label: "Speedster",
                        icon: <Ionicons name="flash" size={22} color="#FFD700" />,
                    },
                    {
                        id: "puzzle",
                        label: "Puzzle",
                        icon: <Ionicons name="extension-puzzle" size={22} color="#9B5CFF" />,
                    },
                    {
                        id: "social",
                        label: "Social",
                        icon: <Ionicons name="heart" size={22} color="#FF5CAD" />,
                    },
                    {
                        id: "tactics",
                        label: "Tactics",
                        icon: <Ionicons name="layers" size={22} color="#4FD1C5" />,
                    },
                ]}
                onAddFriend={() => console.log("Add Friend")}
                onMessage={() => console.log("Message")}
            />
        </View>
    );
}
