import { View, Text } from 'react-native'
import React from 'react'

const ListingTag = ({ tag }) => {
    return (
        <View className="rounded-3xl border-gray-100 border-solid border-[1px] bg-black-100 h-7 w-20 py-1 justify-center items-center m-1 overflow-y-hidden overflow-x-scroll">
            <Text className="color-mint text-center" numberOfLines={1}>{tag.name}</Text>
        </View>
    )
}

export default ListingTag
