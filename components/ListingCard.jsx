import React from 'react'
import DisplayCard from './DisplayCard'
import DisplayCardDataSlot from './DisplayCardDataSlot'
import DisplayCardImageSlot from './DisplayCardImageSlot'
import ListingTag from './ListingTag'
import { View } from 'react-native'

const ListingCard = ({ listing, selected, ownListing, bid }) => {
    const askingPrice = parseInt(listing.askingPrice) > 0 ? parseInt(listing.askingPrice) : "Best\nOffer"

    // Price slot
    const priceSlot = (
        <DisplayCardDataSlot
            header="Asking"
            data={typeof askingPrice === "string" ? askingPrice : `$${askingPrice}`}
            dataSize={typeof askingPrice === "string" ? "md" : "2xl"}
        />
    )

    // Tags slot
    const tagsSlot = (
        <View className="flex-start max-h-[90%] items-center justify-center">
            {listing.tags.slice(0, 2).map((tag) => (
                <ListingTag tag={tag} key={tag.$id} />
            ))}
        </View>
    )

    // Images slot
    const imagesSlot = (
        <DisplayCardImageSlot images={listing.images} />
    )

    // Dynamic fourth slot based on conditions
    const fourthSlot = ownListing ? (
        <DisplayCardDataSlot
            header="Bids"
            data={listing.bids.length}
        />
    ) : bid ? (
        <DisplayCardDataSlot
            header="You bid"
            data={`$${bid.offer}`}
        />
    ) : (
        <DisplayCardDataSlot
            header="Distance"
            data="1.5m"
        />
    )

    return (
        <DisplayCard
            slot1={priceSlot}
            slot2={tagsSlot}
            slot3={imagesSlot}
            slot4={fourthSlot}
            selected={selected}
        />
    )
}

export default ListingCard
