import { FlatList } from "react-native"
import EmptyState from '@/components/EmptyState'
import { useEffect, useState } from "react"
import ClosedListingCard from "../../../components/listingComponents/ClosedListingCard"

// will have to build validator for closing listings before confirmed bids are expired

const ClosedListings = ({ closedListings, selectedListing, setSelectedListing, refetchUserListings }) => {

    const [listings, setListings] = useState([...closedListings])

    useEffect(() => {
        setListings(closedListings)
    }, [closedListings])

    return (
        <FlatList
            style={{ marginLeft: 15, marginTop: 10, maxHeight: (closedListings.length * 90), width: "90%" }}
            contentContainerStyle={{ justifyContent: 'center' }}
            data={listings}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <ClosedListingCard listing={item} ownListings={listings} setListings={setListings} setSelectedListing={setSelectedListing} selectedListing={selectedListing} />
            )}
            ListEmptyComponent={() => (
                <EmptyState
                    title={"No listings found."}
                    subtitle={"Post a listing now!"}
                    buttonText={"Post a listing"}
                    onPress={() => console.log("Click pst new listing")} />
            )}
        />
    )
}

export default ClosedListings
