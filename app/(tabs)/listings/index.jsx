import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserListings } from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import useAppwrite from '../../lib/useAppwrite'
import OwnListings from './OwnListings'
import { getUserBids } from '../../../lib/appwrite'
import UserBids from './UserBids'


const Listings = () => {
    const { user, page } = useGlobalContext()
    const [selectedListing, setSelectedListing] = useState(null)
    const [viewOwnPosts, setViewOwnListings] = useState(true)
    const { data: userListings, refetch } = useAppwrite(() => getUserListings(user.$id))
    const { data: userBids } = useAppwrite(() => getUserBids(user.$id))

    return (
        <SafeAreaView className="bg-primary h-full">
            {/* Your posted listings */}
            <Text className="font-rssemibold text-2xl color-mint">Your listings:</Text>
            <OwnListings userListings={userListings} selectedListing={selectedListing} setSelectedListing={setSelectedListing} />
            {/* Listings you've bid on */}
            <Text className="font-rssemibold text-2xl color-mint">Your bids:</Text>
            <UserBids bids={userBids} />
        </SafeAreaView>
    )
}

export default Listings
