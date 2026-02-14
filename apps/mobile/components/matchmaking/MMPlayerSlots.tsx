import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    Modal,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Radius } from "../../theme/theme";
import InviteFriendsDialog from "../friends/InviteFriendsDialog";

type Player = {
    id: string;
    name: string;
};

type Props = {
    total?: number;
    players: Player[];
    onOpenInvite?: () => void; // optional external handler later
};

export default function MMPlayerSlots({ total = 4, players, onOpenInvite }: Props) {
    const [dialogVisible, setDialogVisible] = useState(false);

    const slots = Array.from({ length: total });

    function handleOpenEmptySlot() {
        if (onOpenInvite) {
            onOpenInvite(); // future control from parent
        } else {
            setDialogVisible(true); // temporary internal dialog
        }
    }

    return (
        <View style={{ alignItems: "center", marginBottom: Spacing.md }}>
            <Text style={styles.title}>Finding players…</Text>

            <View style={styles.row}>
                {slots.map((_, index) => {
                    const player = players[index];
                    const isFilled = !!player;

                    const SlotWrapper = isFilled ? View : Pressable;

                    return (
                        <SlotWrapper
                            key={index}
                            onPress={!isFilled ? handleOpenEmptySlot : undefined}
                            style={[
                                styles.slot,
                                {
                                    backgroundColor: isFilled
                                        ? index === 0
                                            ? Colors.accentBlue
                                            : Colors.accentGreen
                                        : "transparent",
                                    borderWidth: isFilled ? 0 : 2,
                                    opacity: isFilled ? 1 : 0.4,
                                },
                            ]}
                        >
                            <Ionicons
                                name={isFilled ? "person" : "person-add-outline"}
                                size={28}
                                color={isFilled ? "white" : "#8B8FA8"}
                            />
                        </SlotWrapper>
                    );
                })}
            </View>

            <Text style={styles.counter}>
                {players.length}/{total} players found
            </Text>

            <InviteFriendsDialog
                visible={dialogVisible}
                onClose={() => setDialogVisible(false)}
                friends={[]}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: Colors.textPrimary,
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
    },

    row: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 20,
    },

    slot: {
        width: 60,
        height: 60,
        borderRadius: Radius.full,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#8B8FA8",
    },

    counter: {
        color: Colors.textSecondary,
    },

    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalBox: {
        backgroundColor: Colors.card,
        padding: Spacing.lg,
        borderRadius: Radius.lg,
        minWidth: 220,
        alignItems: "center",
    },
});
