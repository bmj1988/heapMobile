import { View, Text, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { acceptBid } from '../../lib/appwrite'
import CustomButton from '../CustomButton'
import { useState } from 'react'

const BidDisplay = ({ bid }) => {

    const [isLoading, setIsLoading] = useState(false)
    const handleAcceptBid = async () => {
        setIsLoading(true)
        await acceptBid(bid.$id)
        setIsLoading(false)
    }


    return (
        <View className="bg-black-200 rounded-2xl m-2 flex-row items-center justify-around">
            <View className="m-1 items-center justify-center">
                <Text className="color-gray-100 text-rsthin">Offer</Text>

                <Text className="text-2xl font-rssemibold color-mint">{`$${bid.offer}`}</Text>
            </View>
            <View className="m-1 items-center justify-center">
                <Text className="color-gray-100 text-rsthin">User</Text>
                <Text className="text-xl font-rsthin color-mint">{bid.buyer.username}</Text>
            </View>
            <CustomButton title="Accept" handlePress={handleAcceptBid} containerStyles="min-h-[40px] p-2" isLoading={isLoading} />
        </View>
    )
}

export default BidDisplay
