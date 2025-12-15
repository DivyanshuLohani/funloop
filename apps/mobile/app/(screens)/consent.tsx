import { View, Text, Pressable, Image, Linking, ActivityIndicator, ToastAndroid } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { loginAsGuest } from "@/services/auth";
import { Colors, Spacing, Radius } from "@/theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";

export default function ConsentScreen() {
    const [loading, setLoading] = useState(false);
    const { updateAuth } = useAuth();
    async function handleContinueAsGuest() {
        setLoading(true);
        try {
            const res = await loginAsGuest();
            if (!res) {
                setLoading(false);
                return;
            }

            await SecureStore.setItemAsync("token", res.token);
            updateAuth(res.token, res.user);
            router.replace("/(drawer)/home");
        } catch (error) {
            // Show toast that guest limit is reached
            // Check error if error is an axios instance
            if (error instanceof AxiosError) {
                if (error.response?.status === 429) {
                    ToastAndroid.show("Guest limit reached", ToastAndroid.SHORT);
                    setLoading(false);
                    return;
                }
            }
            setLoading(false);
        }

    }

    function openLink(url: string) {
        Linking.openURL(url);
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
            {/* HERO IMAGE */}
            <View style={{ alignItems: "center", marginTop: Spacing.xl }}>
                <View
                    style={{
                        borderRadius: Radius.xl,
                        overflow: "hidden",
                    }}
                >
                    <Image
                        // source={require("@/assets/onboarding/hero.png")}
                        style={{
                            width: 280,
                            height: 320,
                            borderRadius: Radius.xl,
                        }}
                        resizeMode="cover"
                    />

                    {/* MULTIPLAYER BADGE */}
                    <View
                        style={{
                            position: "absolute",
                            bottom: 16,
                            right: 16,
                            backgroundColor: Colors.card,
                            borderRadius: Radius.full,
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 14,
                                backgroundColor: "#1ED760",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: 8,
                            }}
                        >
                            <Ionicons name="game-controller" size={16} color="#000" />
                        </View>

                        <View>
                            <Text
                                style={{
                                    color: Colors.textPrimary,
                                    fontWeight: "700",
                                }}
                            >
                                Multiplayer
                            </Text>
                            <Text
                                style={{
                                    color: Colors.textSecondary,
                                    fontSize: 12,
                                }}
                            >
                                Online Now
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* CONTENT */}
            <View
                style={{
                    paddingHorizontal: Spacing.lg,
                    paddingTop: Spacing.xl,
                }}
            >
                {/* TITLE */}
                <Text
                    style={{
                        color: Colors.textPrimary,
                        fontSize: 32,
                        fontWeight: "800",
                    }}
                >
                    Welcome to{" "}
                    <Text style={{ color: Colors.accentBlue }}>Funloop</Text>
                </Text>

                <Text
                    style={{
                        color: Colors.textSecondary,
                        fontSize: 16,
                        marginTop: 8,
                        lineHeight: 22,
                    }}
                >
                    The fastest way to play with friends.{"\n"}
                    No sign-up required.
                </Text>

                {/* CTA */}
                <Pressable
                    onPress={handleContinueAsGuest}
                    style={{
                        marginTop: Spacing.xl,
                        borderRadius: Radius.full,
                        overflow: "hidden",
                    }}
                >
                    <LinearGradient
                        colors={[Colors.accentBlue, "#5B8CFF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            paddingVertical: 16,
                            alignItems: "center",
                            borderRadius: Radius.full,
                        }}
                    >
                        {loading ? <ActivityIndicator color="white" /> : <Text
                            style={{
                                color: "#fff",
                                fontSize: 18,
                                fontWeight: "700",
                            }}
                        >
                            Continue as Guest →
                        </Text>}
                    </LinearGradient>
                </Pressable>

                {/* LOGIN */}
                <Pressable
                    // onPress={() => router.push("/login")}
                    style={{ marginTop: Spacing.lg }}
                >
                    <Text
                        style={{
                            color: Colors.textSecondary,
                            textAlign: "center",
                        }}
                    >
                        Already have an account?{" "}
                        <Text style={{ color: Colors.accentBlue, fontWeight: "600" }}>
                            Log in
                        </Text>
                    </Text>
                </Pressable>

                {/* TERMS */}
                <Text
                    style={{
                        color: Colors.textSecondary,
                        fontSize: 12,
                        textAlign: "center",
                        marginTop: Spacing.xl,
                    }}
                >
                    By continuing, you agree to our{" "}
                    <Text
                        style={{ color: Colors.accentBlue }}
                        onPress={() => openLink("https://funloop.app/terms")}
                    >
                        Terms
                    </Text>{" "}
                    &{" "}
                    <Text
                        style={{ color: Colors.accentBlue }}
                        onPress={() => openLink("https://funloop.app/privacy")}
                    >
                        Privacy Policy
                    </Text>
                    .
                </Text>
            </View>
        </View>
    );
}
