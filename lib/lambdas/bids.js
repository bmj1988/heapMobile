const appwriteHeaders = {
    "X-Appwrite-Project": process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

const bidsDomain = `https://${process.env.EXPO_PUBLIC_BIDS_FUNCTION_DOMAIN}`

export const placeBid = async (form) => {
    console.log("form", form)
    if (!form || !form.buyer || !form.offer || !form.listing) return {error: "Must provide bid details"}
    const response = await fetch(`${bidsDomain}/postBid`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: appwriteHeaders
    })
    const bid = await response.json()
    if (bid.success) return bid.newBid
    return bid.error
}

export const acceptBid = async (bidId) => {
    const response = await fetch(`${bidsDomain}/acceptBid`, {
        method: "POST",
        body: JSON.stringify({bidId}),
        headers: appwriteHeaders
    })
    const bid = await response.json()
    if (bid.success) return bid.newBid
    return bid.error
}
