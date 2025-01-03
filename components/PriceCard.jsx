import { View, Text } from 'react-native'

const PriceCard = ({ card }) => {
    return (
        <View className={`h-fit w-[full] bg-black-200 rounded-2xl p-2 flex-row items-center justify-between`}>
            <View className={`items-center justify-center ${card.minimum ? "w-[25%]" : "w-[40%]"}`}>
                <Text className="color-gray-100 text-rsthin">{"Material"}</Text>
                <Text className={`font-rsbold color-mint text-xl`}>{card.material}</Text>
            </View>
            <View className="items-center justify-center w-[25%]">
                <Text className="color-gray-100 text-rsthin">{"Price"}</Text>
                <Text className={`font-rsbold color-mint text-xl`}>{`$${card.price.toFixed(2)}`}</Text>
            </View>
            <View className="items-center justify-center min-w-[10%]">
                <Text className="color-gray-100 text-rsthin">{"per"}</Text>
                <Text className={`font-rsbold color-mint text-xl`}>{card.type}</Text>
            </View>
            {(card.minimum && card.minimum > 0) &&
                <View className="items-center justify-center w-[25%]">
                    <Text className="color-gray-100 text-rsthin">{"Minimum"}</Text>
                    <Text className={`font-rsbold color-mint text-xl`}>{card.minimum}</Text>
                </View>}

        </View>
    )
}

export default PriceCard
