import { View, Pressable } from 'react-native'
import ListingCard from "@/components/ListingCard"
import DeleteListingButton from "./DeleteListingButton"
import EditListingDetailsModal from '../Modals/EditListingDetailsModal'
import { useCallback, useState } from 'react'
import { deleteListing } from '../../lib/appwrite'
import OwnListingDetailsModal from '../Modals/OwnListingDetailsModal'

const OwnListingCard = ({ listing, ownListings, setSelectedListing, selectedListing, setListings }) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [bidsModalVisible, setBidsModalVisible] = useState(false)

    const confirmDeleteListing = () => {
        deleteListing(listing)
        setSelectedListing(null)
        setListings(ownListings.filter((listing) => listing.$id !== listing.$id))
    }

    const editListing = useCallback(
        (editedListing) => {
            setSelectedListing(null)
            const otherListings = ownListings.filter((otherListing) => otherListing.$id !== editedListing.$id)
            setListings([...otherListings, editedListing])
        }, [ownListings]);

    return (
        <>
            <Pressable onPress={() => {
                setSelectedListing(listing.$id)
                setBidsModalVisible(true)}} onLongPress={() => setModalVisible(true)} className="m-1">
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <ListingCard listing={listing} selected={selectedListing && selectedListing === listing.$id} ownListing={true} />
                    {
                        selectedListing === listing.$id &&
                        <DeleteListingButton listing={listing.$id} valid={true} deleteListing={confirmDeleteListing} />
                    }
                </View>
            </Pressable>
            <OwnListingDetailsModal listing={listing} isVisible={bidsModalVisible} setVisible={setBidsModalVisible} />
            <EditListingDetailsModal listing={listing} setVisible={setModalVisible} isVisible={modalVisible} cycleListings={editListing} />
        </>
    )
}

export default OwnListingCard
