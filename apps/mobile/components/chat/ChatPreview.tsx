import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors, GlobalStyles, Radius, Spacing, Typography } from '@/theme/theme'

const ChatPreview = () => {
    return (
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
    )
}

export default ChatPreview

const styles = StyleSheet.create({})