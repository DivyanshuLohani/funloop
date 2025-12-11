import { Text } from 'react-native'
import React from 'react'
import TopHeader from '@/components/TopHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Spacing, Colors } from '@/theme/theme'

const friends = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background, padding: Spacing.lg }}>
            <TopHeader />
            <Text>friends</Text>
        </SafeAreaView>
    )
}

export default friends