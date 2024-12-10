import { View, Text } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
import CustomButton from './CustomButton'
const FontAwesome = icons.FontAwesome

const EmptyState = ({ title, subtitle, buttonText, onPress }) => {
    return (
        <View className="justify-center items-center mr-8">
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

            <CustomButton title={buttonText} containerStyles={"w-full my-5"} handlePress={onPress} />

        </View>
    )
}

export default EmptyState
