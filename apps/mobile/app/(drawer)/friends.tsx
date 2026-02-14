import { Text, TextInput, View } from 'react-native'
import React from 'react'
import TopHeader from '@/components/TopHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Spacing, Colors, Typography } from '@/theme/theme'
import PlayerSearchInput from '@/components/friends/PlayerSearchInput'
import OnlineFriendsHeader from '@/components/friends/OnlineFriendsHeader'
import FriendListItem from '@/components/friends/FriendListItem'
import { ScrollView } from 'react-native-gesture-handler'

const FriendsPage = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background, padding: Spacing.lg }}>
            <TopHeader />
            <View style={{ flex: 1, gap: Spacing.md }}>
                {/* Input To Search for friends */}
                <PlayerSearchInput value={""} onChangeText={() => { }} />

                {/* Text for existing friends and a badge for currently online */}

                <OnlineFriendsHeader title="Existing Friends" onlineCount={2} />
                {/* Friends List */}
                <ScrollView>
                    <FriendListItem
                        name="X-Slayer99"
                        level={42}
                        subtitle="Playing Among Us"
                        avatar="https://i.pravatar.cc/150?img=12"
                        status="playing"
                        action="chat"
                    />

                    <FriendListItem
                        name="Luna_Vibe"
                        level={18}
                        subtitle="Online"
                        avatar="https://i.pravatar.cc/150?img=5"
                        status="online"
                        action="invite"
                    />

                    <FriendListItem
                        name="GhostMode"
                        subtitle="Last seen 2h ago"
                        avatar="https://i.pravatar.cc/150?img=8"
                        status="offline"
                        action="more"
                    />

                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default FriendsPage