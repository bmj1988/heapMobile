import { FlatList } from "react-native"
import EmptyState from '@/components/EmptyState'
import OwnListingCard from "../../../components/listingComponents/OwnListingCard"
import { useEffect, useState } from "react"

// will have to build validator for closing listings before confirmed bids are expired

const OwnListings = ({ userListings, selectedListing, setSelectedListing, refetchUserListings }) => {

    const [listings, setListings] = useState([...userListings])

    useEffect(() => {
        setListings(userListings)
    }, [userListings])

    return (
        <FlatList
            style={{ marginLeft: 15, marginTop: 10, maxHeight: (userListings.length * 90), width: "90%" }}
            contentContainerStyle={{ justifyContent: 'center' }}
            data={listings}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <OwnListingCard listing={item} ownListings={listings} setListings={setListings} setSelectedListing={setSelectedListing} selectedListing={selectedListing} />
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

export default OwnListings
