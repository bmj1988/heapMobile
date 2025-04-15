const appwriteHeaders = {
    "X-Appwrite-Project": process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

const imagesDomain = `https://${process.env.EXPO_PUBLIC_IMAGES_FUNCTION_DOMAIN}`

export const uploadListingImages = async (images, listingId) => {
    try {
        const imagePromises = images.map(async (image) => {
            // Create form data for the image
            const formData = new FormData();
            formData.append('image', {
                uri: image.uri,
                type: image.mimeType,
                name: image.fileName,
                size: image.fileSize
            });
            formData.append('listingId', listingId);

            const response = await fetch(`${imagesDomain}/images`, {
                method: 'POST',
                body: formData,
                headers: {
                    ...appwriteHeaders,
                    'Content-Type': 'multipart/form-data',
                }
            });
            /// SHOULD RETURN IMAGE URL
            const result = await response.json();
            if (!result.success) throw new Error(result.error);
            return result.image;
        });

        const uploadedImages = await Promise.all(imagePromises);
        return uploadedImages;
    } catch (err) {
        console.error('Error uploading images:', err);
        throw err;
    }
}

export const createImageRecord = (images) => {
    console.log("images", images)
    if (images.length === 0) return;
    fetch(`${imagesDomain}/images`, {
        method: 'POST',
        body: JSON.stringify({images: images}),
        headers: {...appwriteHeaders, "Content-Type": "application/json"}
    })


}
