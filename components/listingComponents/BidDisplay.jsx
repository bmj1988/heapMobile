import { View, Text, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
const BidDisplay = ({ bid }) => {
    return (
        <View className="bg-black-200 rounded-2xl m-1 flex-row items-center justify-around">
            <View className="m-1 items-center justify-center">
                <Text className="color-gray-100 text-rsthin">Offer</Text>
                <Text className="text-2xl font-rssemibold color-mint">{`$${bid.offer}`}</Text>
            </View>
            <View className="m-1 items-center justify-center">
                <Text className="color-gray-100 text-rsthin">User</Text>
                <Text className="text-xl font-rsthin color-mint">{bid.buyer.username}</Text>
            </View>
            <Pressable onPress={() => console.log("accept bid", bid.$id)}>
                <Entypo
                    name={"check"}
                    color={"#50bf88"}
                    size={30} />
            </Pressable>
        </View>
    )
}

export default BidDisplay
