import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserListings } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import useAppwrite from '@/lib/useAppwrite'
import OwnListings from './_OwnListings'
import { getUserBids } from '@/lib/appwrite'
import UserBids from './_UserBids'
import CaretCollapsible from '../../../components/CaretCollapsible'
import CustomModal from '../../../components/Modals/TestingDetailsModal'
import PostListingHeader from './_PostListing'
import OwnListingDetailsModal from '../../../components/Modals/OwnListingDetailsModal'

const Listings = () => {
    const { user, page } = useGlobalContext()
    const [selectedListing, setSelectedListing] = useState(null)
    const [detailsModal, setDetailsModal] = useState({})
    const [bidsModalVisible, setBidsModalVisible] = useState(false)
    const { data: userListings, refetch } = useAppwrite(() => getUserListings(user.$id))
    const { data: userBids } = useAppwrite(() => getUserBids(user.$id))

    return (
        <SafeAreaView className="bg-primary h-full justify-between">
            <View>
                <PostListingHeader refetch={() => refetch()} />
                {/* Your posted listings */}
                <CaretCollapsible text={"Your listings"} DropdownComponent={<OwnListings userListings={userListings} selectedListing={selectedListing} setSelectedListing={setSelectedListing} refetchUserListings={refetch} />} />
                {/* Listings you've bid on */}
                <CaretCollapsible text={"Your bids"} DropdownComponent={<UserBids bids={userBids} setSelected={setDetailsModal} selected={detailsModal} />} />
                {/* <UserBids bids={userBids} /> */}
            </View>
            {Object.keys(detailsModal).length > 0 && <CustomModal visible={Object.keys(detailsModal).length > 0} onClose={() => setDetailsModal({})} listing={detailsModal} />}
        </SafeAreaView>
    )
}

export default Listings
