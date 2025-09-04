import { Text, Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

const NoImageProvided = ({ onPress }) => {
    return (

        <Pressable onPress={onPress ? () => onPress() : null} className="justify-center items-center">
            <FontAwesome name="image" size={50} color="#50bf88" />
            <Text className="text-gray-100 font-rsmedium mt-2">No image provided</Text>
        </Pressable>

    )
}

export default NoImageProvided
