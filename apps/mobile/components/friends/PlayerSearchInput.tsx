import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Radius, Spacing, Typography } from "@/theme/theme"; // adjust path

type Props = {
    value: string;
    onChangeText: (text: string) => void;
};

export default function PlayerSearchInput({ value, onChangeText }: Props) {
    return (

        <View style={styles.searchBox}>
            <Ionicons
                name="search"
                size={18}
                color={Colors.textMuted}
                style={styles.icon}
            />

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Find players by username or ID..."
                placeholderTextColor={Colors.textMuted}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: Radius.full,
        padding: 1, // gives that subtle gradient edge feel
        marginBottom: Spacing.lg,
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.card,
        borderRadius: Radius.full,
        paddingHorizontal: Spacing.md,
        height: 48,
    },

    icon: {
        marginRight: Spacing.sm,
    },

    input: {
        flex: 1,
        ...Typography.body,
        color: Colors.textPrimary,
    },
});
