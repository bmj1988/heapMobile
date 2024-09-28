import { View, Text, Image } from 'react-native'
import React from 'react'
import ListingTag from './ListingTag'

const ListingCard = ({ listing, selected }) => {
    const askingPrice = listing.askingPrice > 0 ? `$${listing.askingPrice}` : "Best Offer"
    return (
        <View className={`${selected ? "border-[1px] border-mint border-solid" : ""} h-[80px] w-[90%] bg-black-200 rounded-2xl p-2 flex-row items-center justify-between`}>
            <View className="m-2 items-center justify-center">
                <Text className="color-gray-100 text-rsthin">Asking</Text>
                <Text className="text-2xl font-rsbold color-mint">{askingPrice}</Text>
            </View>
            <View className="flex-start">
                {/* {listing.tags.map((tag) => {
                    return <ListingTag tag={tag} />
                })} */}
                <ListingTag tag={{ name: "Rotors" }} />
                <ListingTag tag={{ name: "Motors" }} />
            </View>
            <View>
                {listing.images.map((image) => {
                    return <Image source={{ uri: image.url }} style={{ width: 50, height: 50 }} className="rounded-md" key={image.$id} />
                })}
                {/* <Image source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={{width: 40, height: 40}} /> */}
            </View>
            <View className="m-2 items-center justify-center">
                <Text className="color-gray-100 text-rsthin">Distance</Text>
                <Text className="text-2xl font-rsbold color-mint mt-1">1.5m</Text>
            </View>

        </View>
    )
}

export default ListingCard
