import { View, Text, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { acceptBid } from '../../lib/appwrite'
import CustomButton from '../CustomButton'
import { useState } from 'react'

const BidDisplay = ({ bid }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isAccepted, setIsAccepted] = useState(bid.accepted)

    const handleAcceptBid = async () => {
        setIsLoading(true)
        await acceptBid(bid.$id)
        setIsAccepted(true)
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
            {
                !isAccepted && (
                    <CustomButton title="Accept" handlePress={handleAcceptBid} containerStyles="min-h-[40px] p-2" isLoading={isLoading} />
                )
            }
            {
                isAccepted && (
                    <Text className="font-rssemibold color-mint text-lg">Accepted</Text>
                )
            }
        </View>



    )
}

export default BidDisplay
