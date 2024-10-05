import { View, Text } from 'react-native'
import React from 'react'
import { FlatList, Image, Modal, Pressable } from 'react-native'
import ListingTag from '../ListingTag'
import ListingImagesCarousel from './ListingImagesCarousel'
import { FontAwesome } from '@expo/vector-icons'

const ListingDetailsModal = ({ listing, isVisible, setVisible }) => {
    return (
        <Modal animationType="none" transparent={true} visible={isVisible}>
            <View className="flex-1 justify-center items-center absolute top-0 bottom-0 left-0 right-0 bg-['rgba(0,0,0,0.5)']">
                <View className="rounded-2xl border-mint border-solid border-[1px] justify-space items-center h-[60%] w-[85%] bg-black-100 mt-[200px] my-20">
                    <View className="mt-[5px]">
                        <Text className="relative font-rssemibold text-white text-lg">{`Listing #${listing.$id}`}</Text>
                    </View>
                    <View className="justify-center items-center">
                        <ListingImagesCarousel images={listing.images} />
                    </View>
                    <View className="bottom-[200px]">
                        <Text className="text-white font-rssemibold">{"Description"}</Text>
                        <Text className="text-white font-rsregular">{listing.description}</Text>
                    </View>
                    <View className="bottom-[200px]">
                        {listing.tags.map((tag) => {
                            return (
                                <ListingTag tag={tag.name} key={tag.$id} />
                            )
                        })}
                    </View>
                    <View className="justify-center bottom-[130px]">
                        <Pressable onPress={() => setVisible(false)}>
                            <FontAwesome name="close" color="#DC143C" size={40} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ListingDetailsModal
