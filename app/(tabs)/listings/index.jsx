import React, { useState } from 'react'
import { Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserListings } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import useAppwrite from '@/lib/useAppwrite'
import OwnListings from './_OwnListings'
import { getUserBids } from '@/lib/appwrite'
import UserBids from './_UserBids'
import CaretCollapsible from '../../../components/CaretCollapsible'


const Listings = () => {
    const { user, page } = useGlobalContext()
    const [selectedListing, setSelectedListing] = useState(null)
    const [viewOwnPosts, setViewOwnListings] = useState(true)
    const { data: userListings, refetch } = useAppwrite(() => getUserListings(user.$id))
    const { data: userBids } = useAppwrite(() => getUserBids(user.$id))

    return (
        <SafeAreaView className="bg-primary h-full">
            {/* Your posted listings */}
            <CaretCollapsible text={"Your listings"} DropdownComponent={<OwnListings userListings={userListings} selectedListing={selectedListing} setSelectedListing={setSelectedListing} />} />
            {/* Listings you've bid on */}
            <CaretCollapsible text={"Your bids"} DropdownComponent={<UserBids bids={userBids} />} />
            {/* <UserBids bids={userBids} /> */}
        </SafeAreaView>
    )
}

export default Listings
