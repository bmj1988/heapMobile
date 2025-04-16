import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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
import { useSelector, useDispatch } from 'react-redux'
import { fetchOwnListings, openListingsArray, closedListingsArray } from '@/store/listings'

const Listings = () => {
    const { user } = useGlobalContext()
    const [selectedListing, setSelectedListing] = useState(null)
    const [detailsModal, setDetailsModal] = useState({})
    const dispatch = useDispatch()
    const { data: userBids } = useAppwrite(() => getUserBids(user.$id))
    // Split user's listings by status
    const openListings = useSelector(openListingsArray)
    const closedListings = useSelector(closedListingsArray)
    // status for listing state
    const status = useSelector(state => state.listings.status)
    // Split user's bids by acceptance status
    const acceptedBids = userBids.filter(bid => bid.accepted === true)
    const pendingBids = userBids.filter(bid => bid.accepted === false)

    useEffect(() => {
        dispatch(fetchOwnListings(user.$id))
    }, [])
    console.log(openListings)

    return (
        <SafeAreaView className="bg-primary h-full justify-between">
            <View>
                <PostListingHeader />
                {/* Your posted listings */}
                <CaretCollapsible text={"Your open listings"} DropdownComponent={<OwnListings listings={openListings} selectedListing={selectedListing} setSelectedListing={setSelectedListing} />} />
                {/* Listings you've bid on */}
                <CaretCollapsible text={"Your pending bids"} DropdownComponent={<UserBids bids={pendingBids} setSelected={setDetailsModal} selected={detailsModal} />} />
                {/* <UserBids bids={userBids} /> */}
                <CaretCollapsible text={"Bids ready for pickup"} DropdownComponent={<AcceptedBids bids={acceptedBids} setSelected={setDetailsModal} selected={detailsModal} />} />
                <CaretCollapsible text={"Listings waiting for pickup"} DropdownComponent={<ClosedListings closedListings={closedListings} selectedListing={selectedListing} setSelectedListing={setSelectedListing} />} />


            </View>
            {Object.keys(detailsModal).length > 0 && <CustomModal visible={Object.keys(detailsModal).length > 0} onClose={() => setDetailsModal({})} listing={detailsModal} />}
        </SafeAreaView>
    )
}

export default Listings
