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
import ClosedListings from './_ClosedListings'
import AcceptedBids from './_AcceptedBids'

const Listings = () => {
    const { user, page } = useGlobalContext()
    const [selectedListing, setSelectedListing] = useState(null)
    const [detailsModal, setDetailsModal] = useState({})
    const [bidsModalVisible, setBidsModalVisible] = useState(false)
    const { data: userListings, refetch } = useAppwrite(() => getUserListings(user.$id))
    const { data: userBids } = useAppwrite(() => getUserBids(user.$id))
    // Split user's listings by status
    const openListings = userListings.filter(listing => listing.isOpen === true)
    const closedListings = userListings.filter(listing => listing.isOpen === false)
    // Split user's bids by acceptance status
    const acceptedBids = userBids.filter(bid => bid.accepted === true)
    const pendingBids = userBids.filter(bid => bid.accepted === false)

    return (
        <SafeAreaView className="bg-primary h-full justify-between">
            <View>
                <PostListingHeader refetch={() => refetch()} />
                {/* Your posted listings */}
                <CaretCollapsible text={"Your open listings"} DropdownComponent={<OwnListings userListings={openListings} selectedListing={selectedListing} setSelectedListing={setSelectedListing} refetchUserListings={refetch} />} />
                {/* Listings you've bid on */}
                <CaretCollapsible text={"Your pending bids"} DropdownComponent={<UserBids bids={pendingBids} setSelected={setDetailsModal} selected={detailsModal} />} />
                {/* <UserBids bids={userBids} /> */}
                <CaretCollapsible text={"Bids ready for pickup"} DropdownComponent={<AcceptedBids bids={acceptedBids} setSelected={setDetailsModal} selected={detailsModal} />} />
                <CaretCollapsible text={"Listings waiting for pickup"} DropdownComponent={<ClosedListings closedListings={closedListings} selectedListing={selectedListing} setSelectedListing={setSelectedListing} refetchUserListings={refetch} />} />


            </View>
            {Object.keys(detailsModal).length > 0 && <CustomModal visible={Object.keys(detailsModal).length > 0} onClose={() => setDetailsModal({})} listing={detailsModal} />}
        </SafeAreaView>
    )
}

export default Listings
