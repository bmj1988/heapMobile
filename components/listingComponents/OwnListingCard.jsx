import { Pressable } from 'react-native'
import ListingCard from "@/components/ListingCard"

const OwnListingCard = ({ listing, setSelectedListing, selectedListing, setDetailsModalVisible, setEditModalVisible }) => {

    return (
        <>
            <Pressable onPress={() => {
                setSelectedListing(listing.$id)
                setDetailsModalVisible(true)
            }} onLongPress={() => setEditModalVisible(true)} className="m-1">

                <ListingCard listing={listing} selected={selectedListing && selectedListing === listing.$id} ownListing={true} />

            </Pressable>
        </>
    )
}

export default OwnListingCard
