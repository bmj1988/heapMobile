import { View, Pressable } from 'react-native'
import ListingCard from "@/components/ListingCard"
import BidDisplay from './BidDisplay'
import DeleteListingButton from "./DeleteListingButton"

const OwnListingCard = ({ listing, setSelectedListing, selectedListing, refetch }) => {
    return (
        <Pressable onPress={() => setSelectedListing(listing.$id)} className="m-1">
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <ListingCard listing={listing} selected={selectedListing && selectedListing === listing.$id} ownListing={true} />
                {
                    selectedListing === listing.$id &&
                    <DeleteListingButton listing={listing.$id} refetch={refetch} valid={true} deselectListing={() => setSelectedListing(null)} />
                }
            </View>
            {selectedListing === listing.$id &&

                listing.bids.map((bid) => <BidDisplay bid={bid} />)

            }
        </Pressable>
    )
}

export default OwnListingCard
