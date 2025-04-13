const appwriteHeaders = {
    "X-Appwrite-Project": process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

const listingsDomain = `https://${process.env.EXPO_PUBLIC_LISTINGS_FUNCTION_DOMAIN}`

export const closeListing = async (listingId) => {
    const response = await fetch(`${listingsDomain}/${listingId}/status `, {
        method: "PATCH",
        body: JSON.stringify({ isOpen: false }),
        headers: {...appwriteHeaders, "Content-Type": "application/json"}
    })
    const listing = await response.json()
    if (listing.success) return listing.listing
    return listing.error
}

export const fetchUserListings = async (userId) => {
    const response = await fetch(`${listingsDomain}/users/${userId}`, {
        method: "GET",
        headers: appwriteHeaders
    })
    const listings = await response.json()
    if (listings.success) return listings.listings
    return listings.error
}

export const postListing = async (listing) => {
    const response = await fetch(`${listingsDomain}/listings/`, {
        method: 'POST',
        body: JSON.stringify(listing),
        headers: {...appwriteHeaders, "Content-Type": "application/json"}
    })
    if (!response.ok) throw new Error(response.statusText)
    const newListing = await response.json()
    if (newListing.success) return newListing.listing
    throw new Error(newListing.error)
}
