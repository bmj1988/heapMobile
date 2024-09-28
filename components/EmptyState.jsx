import { View, Text, Image } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
import CustomButton from './CustomButton'
import { router } from 'expo-router'
const FontAwesome = icons.FontAwesome

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className="justify-center items-center px-4">
            <FontAwesome
                name="search"
                size={50}
                className="color-mint" />

            <Text className="font-rsmedium text-sm text-gray-100 mb-5">
                {title}
            </Text>
            <Text className="text-xl font-rssemibold text-center text-white mt-2">
                {subtitle}
            </Text>

            <CustomButton title="Post a listing" containerStyles={"w-full my-5"} handlePress={() => router.push('/listings')} />

        </View>
    )
}

export default EmptyState
