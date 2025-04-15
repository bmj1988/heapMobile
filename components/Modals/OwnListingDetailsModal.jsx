import { View, Text, Modal, Pressable, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import ListingTag from '../ListingTag'
import ListingImagesCarousel from './ListingImagesCarousel'
import BidDisplay from '../listingComponents/BidDisplay'
import RevokeBidModal from './RevokeBidModal'

const OwnListingDetailsModal = ({ listing, isVisible, setVisible }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [revokeModalVisible, setRevokeModalVisible] = useState(false);
    const BIDS_PER_PAGE = 5;

    const paginatedBids = useCallback(() => {
        const startIndex = currentPage * BIDS_PER_PAGE;
        return listing.bids.slice(startIndex, startIndex + BIDS_PER_PAGE);
    }, [currentPage, listing.bids]);

    const hasMoreBids = (currentPage + 1) * BIDS_PER_PAGE < listing.bids.length;
    const hasPreviousBids = currentPage > 0;

    const handleRevoke = async () => {
        // TODO: Implement revoke API call here
        console.log('Revoking bid...');
        setRevokeModalVisible(false)
    };

    return (
        <Modal animationType="none" transparent={true} visible={isVisible} onRequestClose={() => setVisible(false)}>
            <View className="flex-1 justify-center items-center absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)]">
                <View className="rounded-2xl border-mint border-solid border-[1px] flex flex-col h-[80%] w-[85%] bg-black-100 p-4">
                    {/* Header */}
                    <View>
                        <Text className="font-rssemibold text-white text-lg">{`Listing #${listing.$id}`}</Text>
                    </View>

                    {/* Images */}
                    <View className="my-2 items-center justify-center">
                        <ListingImagesCarousel images={listing.images} />
                    </View>

                    {/* Description */}
                    <View>
                        <Text className="text-white font-rssemibold">{"Description"}</Text>
                        <Text className="text-white font-rsregular">{listing.description}</Text>
                    </View>

                    {/* Tags */}
                    <View className="flex-row flex-wrap mt-2">
                        {listing.tags.map((tag) => (
                            <ListingTag tag={tag.name} key={tag.$id} />
                        ))}
                    </View>

                    {/* Bids Section */}
                    <View className="flex-1 mt-2">
                        <Text className="text-white font-rssemibold text-lg mb-2">
                            {listing.isOpen ? "Bids" : "Awaiting Pickup"}
                        </Text>
                        {listing.isOpen ? (
                            <>
                                <FlatList
                                    className="flex-1"
                                    data={paginatedBids()}
                                    keyExtractor={(item) => item.$id}
                                    renderItem={({ item }) => (
                                        <BidDisplay bid={item} />
                                    )}
                                    ListEmptyComponent={() => (
                                        <View className="items-center py-4">
                                            <Text className="text-white font-rsregular">No bids yet</Text>
                                        </View>
                                    )}
                                />
                                <View className="flex-row justify-center space-x-4 mt-2">
                                    {hasPreviousBids && (
                                        <Pressable onPress={() => setCurrentPage(prev => prev - 1)}>
                                            <FontAwesome name="caret-up" color="#fff" size={24} />
                                        </Pressable>
                                    )}
                                    {hasMoreBids && (
                                        <Pressable onPress={() => setCurrentPage(prev => prev + 1)}>
                                            <FontAwesome name="caret-down" color="#fff" size={24} />
                                        </Pressable>
                                    )}
                                </View>
                            </>
                        ) : (
                            <View>
                                <BidDisplay bid={listing.bids.find(bid => bid?.accepted)} />
                                <Pressable onPress={() => setRevokeModalVisible(true)}>
                                    <Text className="text-red-500 text-center underline mt-2 font-rsregular">
                                        Revoke this bid
                                    </Text>
                                </Pressable>
                            </View>
                        )}
                    </View>

                    {/* Close Button */}
                    <View className="items-center mt-2">
                        <Pressable onPress={() => setVisible(false)}>
                            <FontAwesome name="close" color="#DC143C" size={40} />
                        </Pressable>
                    </View>
                </View>
            </View>
            <RevokeBidModal
                isVisible={revokeModalVisible}
                setVisible={setRevokeModalVisible}
                onRevoke={handleRevoke}
            />
        </Modal>
    )
}

export default OwnListingDetailsModal
