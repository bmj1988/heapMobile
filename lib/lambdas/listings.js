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

export const postListing = async (listing) => {
    const response = await fetch(`${listingsDomain}/listings`, {
        method: 'POST',
        body: JSON.stringify(listing),
        headers: appwriteHeaders
    })
    if (!response.ok) throw new Error(response.statusText)
    const newListing = await response.json()
    if (newListing.success) return newListing.listing
    throw new Error(newListing.error)
}

//         // Add listing details
//         formData.append('details', form.details);
//         formData.append('askingPrice', form.askingPrice);
//         formData.append('location', JSON.stringify({
//             $id: form.location.$id,
//             address: form.location.address,
//             city: form.location.city,
//             state: form.location.state
//         }));
//         formData.append('tags', JSON.stringify(form.tags));
//         formData.append('user', form.user);

//         // Add images
//         form.images.forEach((image, index) => {
//             formData.append(`images`, {
//                 uri: image.uri,
//                 type: image.mimeType || 'image/jpeg',
//                 name: image.fileName || `image${index}.jpg`,
//                 size: image.fileSize
//             });
//         });

//         const response = await fetch(`${postListingDomain}/listings`, {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 ...appwriteHeaders,
//             }
//         });
//         console.log("RESPONSE", response)
//         const result = await response.json();
//         console.log("RESULT", result)
//         if (!result.success) throw new Error(result.error);
//         return result.listing;
//     } catch (err) {
//         console.error('Error creating listing:', err);
//         throw err;
//     }
// }
