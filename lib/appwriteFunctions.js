import { acceptBid } from "./lambdas/bids"

// FEED DATA
const appwriteHeaders = {
    "X-Appwrite-Project": process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}
export const fetchFeed = async (long, lat, userId, radius=10, page = 1) => {
    if (!long || !lat || !userId || !radius || !page) return []
    console.log("user log, lat, id, radius, page", long, lat, userId, radius, page, process.env.EXPO_PUBLIC_FEED_DOMAIN)
    const response = await fetch(`https://${process.env.EXPO_PUBLIC_FEED_DOMAIN}.appwrite.global/feed?page=${page}&radius=${radius}`, {
        method: "POST",
        headers: {
            "x-user-id": `${userId}`,
            "x-longitude": `${long}`,
            "x-latitude": `${lat}`,
            ...appwriteHeaders
        }
    })
    const listings = await response.json()
    return listings
}

export const placeBid = async (form) => {
    console.log("form", form)
    if (!form || !form.buyer || !form.offer || !form.listing) return {error: "Must provide bid details"}
    const response = await fetch(`https://${process.env.EXPO_PUBLIC_BIDS_FUNCTION_DOMAIN}/postBid`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: appwriteHeaders
    })
    const bid = await response.json()
    if (bid.success) return bid.newBid
    return bid.error
}

/// Accept Bid / Close Listing

export const acceptBidFunction = async (bidId) => {
    const updatedListing = await acceptBid(bidId)
    sendMessage({
        sender: updatedListing.listing.user.$id,
        recipient: updatedListing.buyer.$id,
        message: `Your bid has been accepted and the listing is awaiting pickup. The listing address is ${updatedListing.address}, ${updatedListing.city}, ${updatedListing.state}.`
    })
    sendMessage({
        sender: updatedListing.buyer.$id,
        recipient: updatedListing.listing.user.$id,
        message: `Your listing has been closed and the buyer is heading your way for pickup. If you have not already arranged payment, please do so before releasing the listing to the buyer.`
    })
    return updatedListing
}

// SEARCH DATA - LISTINGS WITH TAG

export const searchListings = async (long, lat, userId, tag, radius, page = 1) => {
    if (!long || !lat || !userId || !radius || !page) return []
    const response = await fetch(`https://${process.env.EXPO_PUBLIC_SEARCH_FUNCTION_DOMAIN}.appwrite.global/listings?page=${page}&radius=${radius}`, {
        method: "GET",
        headers: { "x-user-id": `${userId}`, "x-longitude": `${long}`, "x-latitude": `${lat}`, "x-tag": `${tag}` }
    })
    console.log("search listingsresponse", response)
    const listings = await response.json()
    console.log("listings", listings)
    return listings
}

export const searchBuyers = async (long, lat, userId, tag, radius = 10, page = 1, minPrice = 0) => {
    if (!long || !lat || !userId || !radius || !page) return []
    const headers = {

    }
    const response = await fetch(`https://${process.env.EXPO_PUBLIC_SEARCH_FUNCTION_DOMAIN}.appwrite.global/buyers?page=${page}&radius=${radius}`, {
        method: "GET",
        headers: {
            "x-user-id": `${userId}`,
            "x-longitude": `${long}`,
            "x-latitude": `${lat}`,
            "x-tag": `${tag}`,
            "x-price-min": `${minPrice}`
        }
    })
    console.log("response", response)
    const buyers = await response.json()
    console.log("buyers", buyers)
    return buyers
}
