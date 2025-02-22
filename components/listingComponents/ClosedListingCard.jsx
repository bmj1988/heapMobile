import { View, Pressable } from 'react-native'
import ListingCard from "@/components/ListingCard"
import DeleteListingButton from "./DeleteListingButton"
import { useState } from 'react'
import { deleteListing } from '../../lib/appwrite'
import ClosedListingModal from '../Modals/ClosedListingModal'

const ClosedListingCard = ({ listing, ownListings, setSelectedListing, selectedListing, setListings }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const confirmDeleteListing = () => {
        deleteListing(listing)
        setSelectedListing(null)
        setListings(ownListings.filter((listing) => listing.$id !== listing.$id))
    }

    return (
        <>
            <Pressable
                onPress={() => setSelectedListing(listing.$id)}
                onLongPress={() => setModalVisible(true)}
                className="m-1"
            >
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <ListingCard
                        listing={listing}
                        selected={selectedListing && selectedListing === listing.$id}
                        ownListing={true}
                    />
                    {selectedListing === listing.$id && (
                        <DeleteListingButton
                            listing={listing.$id}
                            valid={true}
                            deleteListing={confirmDeleteListing}
                        />
                    )}
                </View>
            </Pressable>
            <ClosedListingModal
                listing={listing}
                isVisible={modalVisible}
                setVisible={setModalVisible}
            />
        </>
    )
}

export default ClosedListingCard
