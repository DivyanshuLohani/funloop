import {
    DrawerContentScrollView,

} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Radius, Typography } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { getFullAssetUrl } from "@/utils/constants";

export default function CustomDrawer(props: any) {
    const { user } = useAuth();
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ backgroundColor: Colors.background, flex: 1, justifyContent: "space-between" }}
        >
            {/* Profile Section */}
            {/* PROFILE SECTION — EXACT MATCH TO SCREENSHOT */}
            <View>

                <View style={styles.profileSection}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{ uri: getFullAssetUrl(user?.avatar ?? "") }}
                            style={styles.avatar}
                        />
                    </View>
                    <View>
                        <Text style={styles.profileName}>{user?.displayName}</Text>
                        <Text style={styles.profileUsername}>@{user?.username}</Text>
                    </View>
                </View>


                {/* Drawer Items */}
                <View style={{ marginTop: Spacing.md }}>
                    {props.state.routes.map((route: any, index: number) => {
                        const focused = index === props.state.index;
                        const { options } = props.descriptors[route.key];

                        // The icon function is here:
                        const Icon = options.drawerIcon;

                        return (
                            <TouchableOpacity
                                key={route.key}
                                onPress={() => props.navigation.navigate(route.name)}
                                style={[
                                    styles.drawerItem,
                                    focused && styles.drawerItemFocused,
                                ]}
                            >

                                {Icon && Icon({ focused, size: 22, color: focused ? Colors.accentBlue : Colors.textSecondary })}
                                <Text
                                    style={[
                                        styles.drawerLabel,
                                        focused && styles.drawerLabelFocused,
                                    ]}
                                >
                                    {props.descriptors[route.key].options.title || route.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}

                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Logout */}
                <TouchableOpacity style={styles.logoutRow}>
                    <Ionicons name="log-out-outline" size={22} color={Colors.textSecondary} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>

            {/* Invite Friends Card */}
            {/* <LinearGradient
                colors={["#6A5BFF", "#2D9CFF"]}
                style={styles.inviteCard}
            >
                <Image
                    source={{ uri: "https://placehold.co/100x100?text=🐲" }}
                    style={styles.inviteImage}
                />

                <Text style={styles.inviteTitle}>Invite Friends!</Text>
                <Text style={styles.inviteSubtitle}>
                    Get 100 bonus coins for every friend you invite.
                </Text>

                <TouchableOpacity style={styles.inviteButton}>
                    <Text style={styles.inviteButtonText}>Invite Now</Text>
                </TouchableOpacity>
            </LinearGradient> */}
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    profileSection: {
        paddingTop: Spacing.xl,
        paddingBottom: Spacing.lg,
        paddingHorizontal: Spacing.md,
        alignItems: "center",
        backgroundColor: "transparent",
        flexDirection: "row",
        gap: Spacing.md,
    },

    avatarWrapper: {
        width: 80,
        height: 80,
        borderRadius: Radius.full,

        // multicolor ring like screenshot
        padding: 3,
        // backgroundColor: Colors.accentBlue,

        // OPTIONAL: gradient frame if you prefer
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: Colors.accentBlue,
        justifyContent: "center",
        alignItems: "center",

    },

    avatar: {
        width: "100%",
        height: "100%",
        borderRadius: Radius.full,
    },

    profileName: {
        ...Typography.subtitle,
        fontSize: 20,
        fontWeight: "700",
        color: Colors.textPrimary,
        marginBottom: 2,
    },

    profileUsername: {
        ...Typography.small,
        color: Colors.textSecondary,
    },


    name: {
        ...Typography.subtitle,
        textAlign: "center",
    },

    username: {
        ...Typography.small,
        color: Colors.textMuted,
        textAlign: "center",
    },

    divider: {
        height: 1,
        backgroundColor: Colors.borderLight,
        marginVertical: Spacing.lg,
        marginHorizontal: Spacing.md,
    },

    logoutRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.lg,
    },

    logoutText: {
        ...Typography.body,
        marginLeft: Spacing.sm,
    },

    inviteCard: {
        marginHorizontal: Spacing.lg,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        paddingBottom: Spacing.xl,
        alignItems: "center",
        marginBottom: Spacing.xl,
    },

    inviteImage: {
        width: 70,
        height: 70,
        borderRadius: Radius.md,
        marginBottom: Spacing.md,
    },

    inviteTitle: {
        ...Typography.subtitle,
        marginBottom: Spacing.sm,
        textAlign: "center",
    },

    inviteSubtitle: {
        ...Typography.small,
        color: Colors.textPrimary,
        textAlign: "center",
        marginBottom: Spacing.md,
        paddingHorizontal: Spacing.md,
    },

    inviteButton: {
        backgroundColor: Colors.accentGreen,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        borderRadius: Radius.xl,
        marginTop: Spacing.sm,
    },

    inviteButtonText: {
        ...Typography.subtitle,
        color: Colors.textPrimary,
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginHorizontal: 12,
        marginBottom: 6,
        gap: Spacing.sm,
    },

    drawerItemFocused: {
        backgroundColor: Colors.accentBlue + "22", // light tint
    },

    drawerLabel: {
        ...Typography.body,
        color: Colors.textSecondary,
        fontSize: 16,
    },

    drawerLabelFocused: {
        color: Colors.accentBlue,
        fontWeight: "bold",
    },

});
