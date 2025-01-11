import { View, Text, Image } from 'react-native'
import React from 'react'
import ListingTag from './ListingTag'

const ListingCard = ({ listing, selected, ownListing, bid }) => {
    const askingPrice = parseInt(listing.askingPrice) > 0 ? parseInt(listing.askingPrice) : "Best\nOffer"
    return (
        <View className={`${selected ? "border-[1px] border-mint border-solid" : ""} h-fit w-[90%] bg-black-200 rounded-2xl p-1 flex-row items-center justify-between`}>
            <View className="items-center justify-center w-[25%]">
                <Text className="color-gray-100 text-rsthin">Asking</Text>
                <Text className={`font-rsbold color-mint ${typeof askingPrice === "string" ? "text-md" : "text-2xl"}`}>{typeof askingPrice === "string" ? askingPrice : `$${askingPrice}`}</Text>
            </View>
            <View className="flex-start max-h-[90%] items-center justify-center w-[25%]">
                {listing.tags.slice(0, 2).map((tag) => {
                    return <ListingTag tag={tag} key={tag.$id} />
                })}
            </View>
            <View className="w-[25%] h-[90%]">
                {listing.images.map((image) => {
                    const i = listing.images.indexOf(image)
                    return <Image source={image.url ? { uri: image.url } : {uri: image.uri}} style={{ width: 60, height: 60, elevation: 5 - i, right: i * 10, position: 'absolute', borderColor: "#232533", borderRadius: 8, borderWidth: 1 }} className="rounded-md" key={image.$id ? image.$id : image.uri} />
                })}
                {/* <Image source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={{width: 40, height: 40}} /> */}
            </View>
            {!ownListing && !bid &&
                <View className="m-2 items-center justify-center w-[25%]">
                    <Text className="color-gray-100 text-rsthin">Distance</Text>
                    <Text className="text-2xl font-rsbold color-mint mt-1">1.5m</Text>
                </View>
            }
            {ownListing &&
                <View className="m-2 items-center justify-center">
                    <Text className="color-gray-100 text-rsthin">Bids</Text>
                    <Text className="text-2xl font-rsbold color-mint mt-1">{listing.bids.length}</Text>
                </View>
            }
            {bid &&
                <View className="m-2 items-center justify-center">
                    <Text className="color-gray-100 text-rsthin">You bid</Text>
                    <Text className="text-2xl font-rsbold color-mint mt-1">{`$${bid.offer}`}</Text>
                </View>}


        </View>
    )
}

export default ListingCard
