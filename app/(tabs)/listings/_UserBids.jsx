import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import ListingCard from '../../../components/ListingCard'
import { router } from 'expo-router'

const UserBids = ({ bids, setSelectedBid, selectedBid }) => {
    return (
        <FlatList
            className="max-h-[250px] w-[90%] m-5"
            contentContainerStyle={{ justifyContent: 'center' }}
            data={bids}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <Pressable onPress={() => console.log("clicked a listing you bid on")}>
                    <ListingCard listing={item.listing} selected={selectedBid === item.$id} bid={item} />
                </Pressable>
            )}
            ListEmptyComponent={() => (
                <EmptyState
                    title={"No listings found."}
                    subtitle={"Bid on a listing now!"}
                    buttonText={"Go to feed"}
                    onPress={() => router.replace('/home')} />
            )}
        />
    )
}

export default UserBids
