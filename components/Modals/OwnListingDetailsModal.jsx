import { View, Text, Modal, Pressable, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import ListingTag from '../ListingTag'
import ListingImagesCarousel from './ListingImagesCarousel'
import BidDisplay from '../listingComponents/BidDisplay'
import RevokeBidModal from './RevokeBidModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteListingThunk } from '../../store/listings'

const OwnListingDetailsModal = ({ listingId, isVisible, setVisible, setEditModalVisible }) => {
    if (!listingId) return null
    const listing = useSelector(state => state.listings.openListings[listingId])
    const [currentPage, setCurrentPage] = useState(0);
    const [revokeModalVisible, setRevokeModalVisible] = useState(false);
    const BIDS_PER_PAGE = 5;
    const dispatch = useDispatch()

    const paginatedBids = useCallback(() => {
        const startIndex = currentPage * BIDS_PER_PAGE;
        return listing.bids.slice(startIndex, startIndex + BIDS_PER_PAGE);
    }, [currentPage, listing.bids]);

    const openEditModal = () => {
        setVisible(false)
        setEditModalVisible(true)
    }

    const deleteListing = async () => {
        await dispatch(deleteListingThunk(listing.$id))
        setVisible(false)
    }

    const hasMoreBids = (currentPage + 1) * BIDS_PER_PAGE < listing.bids.length;
    const hasPreviousBids = currentPage > 0;

    const handleRevoke = async () => {
        // TODO: Implement revoke API call here
        console.log('Revoking bid...');
        setRevokeModalVisible(false)
    };

    return (
        <Modal animationType="none" transparent={true} visible={isVisible} onRequestClose={() => setVisible(false)}>
            <View className="flex-1 justify-center items-center absolute top-0 bottom-0 left-0 right-0 bg-['rgba(0,0,0,0.5)']">
                <View className="rounded-2xl border-mint border-solid border-[1px] flex flex-col h-[80%] w-[85%] bg-black-100">
                    {/* Header */}
                    <View className="p-4">
                        <Text className="font-rssemibold text-white text-lg">{`Listing #${listing.$id}`}</Text>
                    </View>

                    {/* Images */}
                    <View className="my-2 items-center justify-center">
                        <ListingImagesCarousel images={listing.images} />
                    </View>

                    {/* Description */}
                    <View className="p-4">
                        <Text className="text-white font-rssemibold">{"Description"}</Text>
                        <Text className="text-white font-rsregular">{listing.description}</Text>
                    </View>

                    {/* Tags */}
                    <View className="flex-row flex-wrap mt-2 p-4">
                        {listing.tags.map((tag) => (
                            <ListingTag tag={tag} key={tag.$id} />
                        ))}
                    </View>

                    {/* Bids Section */}
                    <View className="flex-1 mt-2 p-4">
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

                    {/* Buttons */}
                    <View className="flex-row w-full">
                        <Pressable
                            onPress={openEditModal}
                            className="w-1/2 bg-mint py-3 rounded-bl-2xl items-center">
                            <Text className="text-black-100 font-rssemibold text-lg">Edit</Text>
                        </Pressable>
                        <Pressable
                            onPress={deleteListing}
                            className="w-1/2 bg-[#DC143C] py-3 rounded-br-2xl items-center">
                            <Text className="text-white font-rssemibold text-lg">Delete</Text>
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
