// FEED DATA

export const fetchFeed = async (long, lat, userId, radius=10, page = 1) => {
    if (!long || !lat || !userId || !radius || !page) return []
    const response = await fetch(`https://${process.env.EXPO_PUBLIC_LOCATION_FUNCTION_DOMAIN}.appwrite.global/feed?page=${page}&radius=${radius}`, {
        method: "GET",
        headers: { "x-user-id": `${userId}`, "x-longitude": `${long}`, "x-latitude": `${lat}` }
    })
    console.log("response", response)
    const listings = await response.json()
    console.log("listings", listings)
    return listings
}

// SEARCH DATA - LISTINGS WITH TAG

export const searchListings = async (long, lat, userId, tag, radius, page = 1) => {
    if (!long || !lat || !userId || !radius || !page) return []
    const response = await fetch(`https://${process.env.EXPO_PUBLIC_SEARCH_FUNCTION_DOMAIN}.appwrite.global/listings?page=${page}&radius=${radius}`, {
        method: "GET",
        headers: { "x-user-id": `${userId}`, "x-longitude": `${long}`, "x-latitude": `${lat}`, "x-tag": `${tag}` }
    })
    console.log("response", response)
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
