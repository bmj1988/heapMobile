import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserListings } from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import useAppwrite from '../../lib/useAppwrite'
import OwnListings from './OwnListings'


const Listings = () => {
    const { user, page } = useGlobalContext()
    const [selectedListing, setSelectedListing] = useState(null)
    const [viewOwnPosts, setViewOwnListings] = useState(true)
    const { data: userListings, refetch } = useAppwrite(() => getUserListings(user.$id))

    return (
        <SafeAreaView className="bg-primary h-full">
            {/* Your posted listings */}
            <Text className="font-rssemibold text-2xl color-mint">Your listings:</Text>
            <OwnListings userListings={userListings} />
            {/* Listings you've bid on */}
        </SafeAreaView>
    )
}

export default Listings
