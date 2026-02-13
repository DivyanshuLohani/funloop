import { ScrollView, Image, Text, TouchableOpacity, View, Pressable } from 'react-native'
import React from 'react'
import { GlobalStyles, Radius, Spacing, Typography, Colors } from '@/theme/theme'
import { LinearGradient } from 'expo-linear-gradient'
import TopHeader from '@/components/TopHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getSocket } from '@/services/socket'
import { router } from 'expo-router'
import ProfilePreviewDemo from '@/components/profile/demo-profile'
import { GameType } from '@funloop/types'
import { clearAppSession } from '@/utils/devReset'
import { useAuth } from '@/hooks/useAuth'
import { getFullAssetUrl } from '@/utils/constants'
import ChatPreview from '@/components/chat/ChatPreview'
import GamePreview from '@/components/games/GamePreview'


const HomeScreen = () => {
    const { user } = useAuth();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background, padding: Spacing.lg }}>
            <TopHeader />
            <ScrollView style={{ flex: 1 }}>
                {/* Profile Card */}
                <View style={GlobalStyles.profileCard}>
                    <Image
                        source={{ uri: getFullAssetUrl(user?.avatar ?? "https://i.pravatar.cc/150") }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: Radius.full,
                            marginRight: Spacing.md,
                        }}
                    />
                    <View>
                        <Text style={Typography.subtitle}>{user?.username}</Text>
                        <Text style={{ color: Colors.gold, marginTop: 4 }}>💰 {user?.coins} Coins</Text>
                    </View>
                </View>

                {/* Chat Preview */}
                {/* <ChatPreview /> */}

                <GamePreview />

                {/* Buttons */}
                <TouchableOpacity
                    style={GlobalStyles.primaryButton}
                    onPress={() => {
                        const socket = getSocket();
                        socket?.emit("QUEUE_JOIN", { gameType: GameType.TICTACTOE });
                        router.push({
                            pathname: "/matchmaking",
                            params: {
                                gameType: GameType.TICTACTOE,
                                players: 2,
                                mode: "quick"
                            }
                        });
                    }}
                >
                    <Text style={Typography.subtitle}>Play Now</Text>
                </TouchableOpacity>
                <View style={GlobalStyles.rowBetween}>
                    <TouchableOpacity style={GlobalStyles.secondaryButton}>
                        <Text style={{ ...Typography.body, color: Colors.textPrimary }}>Join Room</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={GlobalStyles.secondaryButton}>
                        <Text style={{ ...Typography.body, color: Colors.textPrimary }}>Create Room</Text>
                    </TouchableOpacity>
                </View>
                <ProfilePreviewDemo />
                {__DEV__ && <Pressable
                    onPress={async () => {
                        await clearAppSession();
                        router.replace("/consent");
                    }}
                    style={{
                        position: "absolute",
                        bottom: 40,
                        right: 20,
                        backgroundColor: "#ff4444",
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        borderRadius: 10,
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                        Reset App
                    </Text>
                </Pressable>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
