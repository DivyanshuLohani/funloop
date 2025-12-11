import { ScrollView, Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { GlobalStyles, Radius, Spacing, Typography, Colors } from '@/theme/theme'
import { LinearGradient } from 'expo-linear-gradient'
import TopHeader from '@/components/TopHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getSocket } from '@/services/socket'

const HomeScreen = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background, padding: Spacing.lg }}>
            <TopHeader />
            <ScrollView style={{ flex: 1 }}>
                {/* Profile Card */}
                <View style={GlobalStyles.profileCard}>
                    <Image
                        source={{ uri: "https://i.pravatar.cc/150" }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: Radius.full,
                            marginRight: Spacing.md,
                        }}
                    />
                    <View>
                        <Text style={Typography.subtitle}>PlayerOne</Text>
                        <Text style={{ color: Colors.gold, marginTop: 4 }}>💰 1,250 Coins</Text>
                    </View>
                </View>

                {/* Chat Preview */}
                <View style={GlobalStyles.chatCard}>
                    <View style={[GlobalStyles.rowBetween, { marginBottom: Spacing.sm }]}>
                        <Text style={Typography.subtitle}>Chat</Text>
                        <Text style={{ color: Colors.textMuted }}>View All →</Text>
                    </View>

                    {/* Chat item 1 */}
                    <View style={[GlobalStyles.rowBetween, { marginBottom: Spacing.md }]}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                                source={{ uri: "https://i.pravatar.cc/150?img=5" }}
                                style={{ width: 45, height: 45, borderRadius: Radius.full }}
                            />
                            <View style={{ marginLeft: Spacing.sm }}>
                                <Text style={Typography.body}>GamerGirl92</Text>
                                <Text style={{ color: Colors.textSecondary }}>Ready for another round of Ludo?</Text>
                            </View>
                        </View>
                        <Text style={{ color: Colors.textMuted }}>2 min</Text>
                    </View>

                    {/* Chat item 2 */}
                    <View style={GlobalStyles.rowBetween}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                                source={{ uri: "https://i.pravatar.cc/150?img=8" }}
                                style={{ width: 45, height: 45, borderRadius: Radius.full }}
                            />
                            <View style={{ marginLeft: Spacing.sm }}>
                                <Text style={Typography.body}>KingOfChess</Text>
                                <Text style={{ color: Colors.textSecondary }}>GG! Let’s play again sometime.</Text>
                            </View>
                        </View>
                        <Text style={{ color: Colors.textMuted }}>15 min</Text>
                    </View>
                </View>

                {/* Choose a Game */}
                <Text style={[Typography.heading, { marginBottom: Spacing.md }]}>
                    Choose a Game
                </Text>

                <View style={[GlobalStyles.rowBetween, { marginBottom: Spacing.xl }]}>

                    {/* Ludo */}
                    <TouchableOpacity style={{ width: "47%" }}>
                        <LinearGradient
                            colors={["#6A5AE0", "#3BA3FF"]}
                            style={GlobalStyles.gameTile}
                        >
                            <Image
                                source={{ uri: "https://i.imgur.com/OKKrn5A.png" }}
                                style={{ width: "100%", height: 120, borderRadius: Radius.md }}
                                resizeMode="cover"
                            />
                        </LinearGradient>
                        <Text style={{ color: Colors.textPrimary, textAlign: "center", marginTop: Spacing.sm }}>
                            Ludo
                        </Text>
                    </TouchableOpacity>

                    {/* Chess */}
                    <TouchableOpacity style={{ width: "47%" }}>
                        <View style={[GlobalStyles.gameTile, { backgroundColor: Colors.cardMuted }]}>
                            <Image
                                source={{ uri: "https://i.imgur.com/M2gX4s9.png" }}
                                style={{ width: "100%", height: 120, borderRadius: Radius.md }}
                                resizeMode="cover"
                            />
                        </View>
                        <Text style={{ color: Colors.textPrimary, textAlign: "center", marginTop: Spacing.sm }}>
                            Chess
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Buttons */}
                <TouchableOpacity style={GlobalStyles.primaryButton} onPress={() => getSocket()?.emit("QUEUE_JOIN", { gameType: "tictactoe" })}>
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
