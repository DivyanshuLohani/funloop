import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Typography, Spacing, GlobalStyles, Radius, Colors } from '@/theme/theme'
import { LinearGradient } from 'expo-linear-gradient'

const GamePreview = () => {
    return (
        <View>

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

        </View>
    )
}

export default GamePreview