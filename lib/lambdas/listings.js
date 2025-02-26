const appwriteHeaders = {
    "X-Appwrite-Project": process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

const listingsDomain = `https://${process.env.EXPO_PUBLIC_LISTINGS_FUNCTION_DOMAIN}`

export const closeListing = async (listingId) => {
    const response = await fetch(`${listingsDomain}/close-listing`, {
        method: "POST",
        body: JSON.stringify({id: listingId}),
        headers: appwriteHeaders
    })
    const listing = await response.json()
    if (listing.success) return listing.listing
    return listing.error
}
