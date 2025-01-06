import { View, Text } from 'react-native'
import React from 'react'

const BidDisplay = ({ bid }) => {
    return (
        <View className="h-[40px] w-[50%] bg-black-200 rounded-2xl p-2 flex-row items-center justify-around">
            <View className="m-2 items-center justify-center">
                <Text className="color-gray-100 text-rsthin">Offer</Text>
                <Text className="text-2xl font-rsbold color-mint">{bid.offer}</Text>
            </View>
            <View className="m-2 items-center justify-center">
                <Text className="color-gray-100 text-rsthin">User</Text>
                <Text className="text-2xl font-rsbold color-mint">{bid.buyer.username}</Text>
            </View>
            <View className="m-2 items-center justify-center">
                <CustomButton title={"Accept Bid"} handlePress={() => console.log("Click accept bid")} />
            </View>
        </View>
    )
}

export default BidDisplay
