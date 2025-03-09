import { View, Text } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
import CustomButton from './CustomButton'
const FontAwesome = icons.FontAwesome

const EmptyState = ({ title, iconSize = 50, subtitle, buttonText, onPress, icon = "search", button = true, viewStyling, iconColor="mint" }) => {
    return (
        <View className={`justify-center items-center mr-8 ${viewStyling}`}>
            <FontAwesome
                name={icon}
                size={iconSize}
                className={`color-${iconColor}`} />

            <Text className="font-rsmedium text-sm text-gray-100 mb-5">
                {title}
            </Text>
            {subtitle &&
                <Text className="text-xl font-rssemibold text-center text-white mt-2">
                    {subtitle}
                </Text>}
            {button &&
                <CustomButton title={buttonText} containerStyles={"w-full my-5"} handlePress={onPress} />
            }
        </View>
    )
}

export default EmptyState
