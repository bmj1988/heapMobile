import { View, Text } from 'react-native'
import React from 'react'
import { FlatList, Image, Modal, Pressable } from 'react-native'
import ListingTag from '../ListingTag'
import ListingImagesCarousel from './ListingImagesCarousel'
import { FontAwesome } from '@expo/vector-icons'

const ListingDetailsModal = ({ listing, isVisible, setVisible }) => {
    return (
        <Modal animationType="none" transparent={true} visible={isVisible}>
            <View className="flex justify-center items-center h-[60%] w-[85%] bg-black-100 mt-[200px] absolute">
                <View className="justify-start m-1">
                    <Text className="font-rssemibold text-white text-lg">{`Listing #${listing.$id}`}</Text>
                </View>
                <View className="justify-center items-center">
                    <ListingImagesCarousel images={listing.images} />
                </View>
                <View>
                    <Text>{"Description"}</Text>
                    <Text>{listing.description}</Text>
                </View>
                <View>
                    {listing.tags.map((tag) => {
                        return (
                            <ListingTag tag={tag.name} key={tag.$id} />
                        )
                    })}
                </View>
                <View className="justify-center">
                    <Pressable onPress={() => setVisible(false)}>
                        <FontAwesome name="close" color="#DC143C" size={40} />
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default ListingDetailsModal
