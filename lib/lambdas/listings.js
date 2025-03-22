const appwriteHeaders = {
    "X-Appwrite-Project": process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

const listingsDomain = `https://${process.env.EXPO_PUBLIC_LISTINGS_FUNCTION_DOMAIN}`
const postListingDomain = `https://${process.env.EXPO_PUBLIC_POST_LISTING_FUNCTION_DOMAIN}`

export const closeListing = async (listingId) => {
    const response = await fetch(`${listingsDomain}/${listingId}/status `, {
        method: "PATCH",
        body: JSON.stringify({ isOpen: false }),
        headers: appwriteHeaders
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

export const postListing = async (form) => {
    const formData = new FormData();

    // Add listing details
    formData.append('details', form.details);
    formData.append('askingPrice', form.askingPrice);
    formData.append('location', form.location);
    formData.append('tags', JSON.stringify(form.tags));
    formData.append('user', form.user);

    // Add images
    if (form.images && form.images.length > 0) {
        form.images.forEach((image, index) => {
            formData.append('images', {
                uri: image.uri,
                type: image.type || 'image/jpeg',
                name: image.fileName || `image${index}.jpg`
            });
        });
    }

    const response = await fetch(`${postListingDomain}/listings`, {
        method: "POST",
        body: formData,
        headers: {
            ...appwriteHeaders,
            'Content-Type': 'multipart/form-data',
        }
    });

    const result = await response.json();
    if (result.success) return result.listing;
    throw new Error(result.error);
}
