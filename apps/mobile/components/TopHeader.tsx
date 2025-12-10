import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { GlobalStyles, Spacing, Typography, Colors } from '@/theme/theme'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ParamListBase } from '@react-navigation/native'

const TopHeader = () => {
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
    return (
        <View style={[GlobalStyles.rowBetween, { marginBottom: Spacing.lg }]}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={28} color={Colors.textPrimary} />
            </TouchableOpacity>
            <Text style={Typography.title}>Funloop</Text>
            <Ionicons name="notifications-outline" size={26} color={Colors.textPrimary} />
        </View>
    )
}

export default TopHeader