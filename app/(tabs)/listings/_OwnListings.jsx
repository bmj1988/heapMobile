import { FlatList } from "react-native"
import EmptyState from '@/components/EmptyState'
import OwnListingCard from "../../../components/listingComponents/OwnListingCard"
import { useState } from "react"
import OwnListingDetailsModal from "@/components/Modals/OwnListingDetailsModal"
import EditListingDetailsModal from "@/components/Modals/EditListingDetailsModal"


// will have to build validator for closing listings before confirmed bids are expired

const OwnListings = ({ listings, selectedListing, setSelectedListing }) => {

    const [detailsModalVisible, setDetailsModalVisible] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)

    return (
        <>
            <FlatList
                style={{
                    marginLeft: 15,
                    marginTop: 10
                }}
                contentContainerStyle={{
                    justifyContent: 'center',
                    paddingBottom: listings.length > 5 ? 120 : 0, // Only add padding if there are items
                    flexGrow: 1 // This ensures content can grow to fill space
                }}
                data={listings}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <OwnListingCard listing={item} setSelectedListing={setSelectedListing} selectedListing={selectedListing} setDetailsModalVisible={setDetailsModalVisible} setEditModalVisible={setEditModalVisible} key={item.$id} />
                )} setListings
                ListEmptyComponent={() => (
                    <EmptyState
                        title={"No listings found."}
                        subtitle={"Post a listing now!"}
                        buttonText={"Post a listing"}
                        onPress={() => console.log("Click pst new listing")} />
                )}
            />
            <OwnListingDetailsModal listingId={selectedListing} isVisible={detailsModalVisible} setVisible={setDetailsModalVisible} setEditModalVisible={setEditModalVisible} />
            <EditListingDetailsModal listingId={selectedListing} setVisible={setEditModalVisible} isVisible={editModalVisible} />
        </>
    )
}

export default OwnListings
