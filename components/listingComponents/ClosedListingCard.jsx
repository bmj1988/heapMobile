import { View, Pressable } from 'react-native'
import DeleteListingButton from "./DeleteListingButton"
import { useState } from 'react'
import { deleteListing } from '../../lib/appwrite'
import ClosedListingModal from '../Modals/ClosedListingModal'
import DisplayCard from '../DisplayCard'
import DisplayCardDataSlot from '../DisplayCardDataSlot'
import DisplayCardImageSlot from '../DisplayCardImageSlot'

const ClosedListingCard = ({ listing, ownListings, setSelectedListing, selectedListing, setListings }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const askingPrice = parseInt(listing.askingPrice) > 0 ? parseInt(listing.askingPrice) : "Best\nOffer"
    const acceptedBid = listing.bids.find(bid => bid.accepted === true)

    const confirmDeleteListing = () => {
        deleteListing(listing)
        setSelectedListing(null)
        setListings(ownListings.filter((listing) => listing.$id !== listing.$id))
    }

    // Prepare slots for DisplayCard
    const priceSlot = (
        <DisplayCardDataSlot
            header="Asked"
            data={typeof askingPrice === "string" ? askingPrice : `$${askingPrice}`}
            dataSize={typeof askingPrice === "string" ? "md" : "2xl"}
        />
    )

    const bidSlot = (
        <DisplayCardDataSlot
            header="Bid"
            data={`$${acceptedBid?.offer || 0}`}
        />
    )

    const imagesSlot = (
        <DisplayCardImageSlot images={listing.images} />
    )

    const statusSlot = (
        <DisplayCardDataSlot
            header="Status"
            data="Holding"
            dataSize="md"
        />
    )

    return (
        <>
            <Pressable
                onPress={() => setSelectedListing(listing.$id)}
                onLongPress={() => setModalVisible(true)}
                className="m-1"
            >
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <DisplayCard
                        slot1={priceSlot}
                        slot2={bidSlot}
                        slot3={imagesSlot}
                        slot4={statusSlot}
                        selected={selectedListing === listing.$id}
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
                acceptedBid={acceptedBid}
                isVisible={modalVisible}
                setVisible={setModalVisible}
            />
        </>
    )
}

export default ClosedListingCard
