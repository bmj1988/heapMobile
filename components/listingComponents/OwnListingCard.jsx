import { View, Pressable } from 'react-native'
import ListingCard from "@/components/ListingCard"
import BidDisplay from './BidDisplay'
import DeleteListingButton from "./DeleteListingButton"
import EditListingDetailsModal from '../Modals/EditListingDetailsModal'
import { useCallback, useState } from 'react'
import { deleteListing } from '../../lib/appwrite'

const OwnListingCard = ({ listing, ownListings, setSelectedListing, selectedListing, setListings }) => {

    const [modalVisible, setModalVisible] = useState(false)
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
            <Pressable onPress={() => setSelectedListing(listing.$id)} onLongPress={() => setModalVisible(true)} className="m-1">
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <ListingCard listing={listing} selected={selectedListing && selectedListing === listing.$id} ownListing={true} />
                    {
                        selectedListing === listing.$id &&
                        <DeleteListingButton listing={listing.$id} valid={true} deleteListing={confirmDeleteListing} />
                    }
                </View>
            </Pressable>

            <EditListingDetailsModal listing={listing} setVisible={setModalVisible} isVisible={modalVisible} cycleListings={editListing} />
        </>
    )
}

export default OwnListingCard
