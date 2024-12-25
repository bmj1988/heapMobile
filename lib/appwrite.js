import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite'

export const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM_ID,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: '66ef5fa60020efdea248',
    userCollectionId: '675246080019af4d7931',
    imagesCollectionId: '67524b75003152e10590',
    cardsCollectionId: '675265a8002af5df3058',
    locationsCollectionId: '67524767002c2d40b09b',
    bidsCollectionId: '675249cf003a1e7a2623',
    messagesCollectionId: '67524bbe003d80233339',
    listingsCollectionId: '675248be000a66ea32fe',
    reviewsCollectionId: '67526661003d6dbe92df',
    recordsCollectionId: '675266ec0006f767c4cb',
    tagsCollectionId: '67526603001f930e7fea',
    storageId: '66ef5f97002b35a4b448'

}


const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
    try {
        const loweredEmail = email.toLowerCase()
        const newAccount = await account.create(ID.unique(), loweredEmail, password, username)
        if (!newAccount) throw new Error("Account generation failed");
        const avatarUrl = avatars.getInitials(username || email)
        await signIn(email, password)
        const newUser = await databases.createDocument(config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                avatar: avatarUrl,
                username,
            })
        console.log('User creation successful')
        return newUser
    }
    catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export async function signIn(email, password) {
    try {
        const loweredEmail = email.toLowerCase()
        const session = await account.createEmailPasswordSession(loweredEmail, password)
        console.log('LOGIN SESSION', session)
        return session;
    }
    catch (e) {
        throw new Error(e)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) {
            throw Error
        }
        console.log('CURRENT ACCOUNT', currentAccount)
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        console.log('CURRENT USER', currentUser)
        if (!currentUser) throw new Error("User could not be found");
        return currentUser.documents[0]
    }
    catch (e) {
        console.log(e)
    }
}

export const updateLocation = async (userId, longitude, latitude) => {
    try {
        const userUpdate = await databases.updateDocument(config.databaseId, config.userCollectionId, userId, {
            latitude,
            longitude,
        })
        console.log("USER UPDATED LOCATION RETURN", userUpdate)
        return userUpdate
    }
    catch (e) {
        throw new Error(e)
    }
}
// IN THE FUTURE THIS WILL HAVE TO BE CHECKED VIA GEOLOCATION FOR PROXIMITY
export const getAllListings = async (userId, page = 1) => {
    try {
        const posts = await databases.listDocuments(config.databaseId,
            config.listingsCollectionId,
            [
                Query.notEqual('user', [userId]),
                Query.equal('isOpen', true),
                Query.orderDesc('$createdAt'),
                Query.limit(5),
                Query.offset((5 * page) - 5)
            ]
        );

        // console.log(posts.documents)

        return posts.documents;
    }
    catch (e) {
        throw new Error(e)
    }
}
export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.orderDesc('$createdAt', Query.limit(7))])
        return posts.documents;
    }
    catch (e) {
        throw new Error(e)
    }
}
// netsh interface portproxy add v4tov4 listenport=6379 listenaddress=0.0.0.0 connectport=6379 connectaddress=172.21.140.163

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.search('title', query)])
        return posts.documents;
    }
    catch (e) {
        throw new Error(e)
    }
}

export const getUserListings = async (userId) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.listingsCollectionId, [Query.equal('user', userId)])
        return posts.documents;
    }
    catch (e) {
        throw new Error(e)
    }
}

export const getUserBids = async (userId) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.bidsCollectionId, [Query.equal('buyer', userId)])
        return posts.documents;
    }
    catch (e) {
        throw new Error(e)
    }
}

export const getUserLocations = async (userId) => {
    try {
        const locations = await databases.listDocuments(config.databaseId, config.locationsCollectionId, [Query.equal('user', userId)])
        return locations.documents;
    }
    catch (e) {
        throw new Error(e)
    }
}

export const getUserInbox = async (userId) => {
    try {
        const inbox = await databases.listDocuments(config.databaseId, config.messagesCollectionId, [Query.equal('recipient', userId)])
        return inbox.documents;
    }
    catch (e) {
        throw new Error(e)
    }
}

export const sendMessage = async (message) => {
    try {
        const newMessage = await databases.createDocument(config.databaseId, config.messagesCollectionId, ID.unique(), message)
        return newMessage
    }
    catch (e) {
        throw new Error(e)
    }
}

export const markSeen = async (messageId) => {
    try {
        await databases.updateDocument(config.databaseId, config.messagesCollectionId, messageId, {
            seen: true
        })
    }
    catch (e) {
        throw new Error(e)
    }
}

export const getUserOutbox = async (userId) => {
    try {
        const outbox = await databases.listDocuments(config.databaseId, config.messagesCollectionId, [Query.equal('sender', userId)])
        return outbox.documents;
    }
    catch (e) {
        throw new Error(e)
    }
}
export const getReviews = async (userId) => {
    try {
        const response = await databases.listDocuments(config.databaseId, config.reviewsCollectionId, [Query.equal('user', userId)])
        const reviews = response.documents
        const volume = reviews.length
        let totalStars = 0
        for (let review of reviews) {
            totalStars += review.rating
        }
        let average = totalStars / volume
        return [volume, average]

    }

    catch (e) {
        throw new Error(e)
    }
}


export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
        return session
    }
    catch (e) {
        throw new Error(e)
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;
    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(config.storageId, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100)
        }
        else {
            throw new Error('Invalid file type')
        }
        if (!fileUrl) throw Error;

        return fileUrl
    }
    catch (e) {
        throw new Error(e)
    }
}

export const postImage = async (url, listing) => {
    try {
        await databases.createDocument(config.databaseId, config.imagesCollectionId, ID.unique(), {
            listing,
            url
        })
    }
    catch (e) {
        console.error(e)
    }
}

export const uploadFile = async (file, type, listingId) => {
    if (!file) return;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    }

    try {
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        )

        const fileUrl = await getFilePreview(uploadedFile.$id, type)

        if (listingId) {
            await databases.createDocument(config.databaseId, config.imagesCollectionId, ID.unique(), { listing: listingId, url: fileUrl })
        }

        return fileUrl
    }
    catch (e) {
        throw new Error(e)
    }
}

export const postListing = async (form) => {
    let { details, location, askingPrice, user, tags } = form
    try {
        let listing = await databases.createDocument(config.databaseId, config.listingsCollectionId, ID.unique(), {
            details,
            location,
            askingPrice,
            user,
            tags
        })

        if (form.images.length > 0) {
            let images = []
            for (let image of form.images) {
                await uploadFile(image, 'image', listing.$id)

            }
        }
        return true
    }
    catch (e) {
        console.error(e)
        return false
    }
}

export const getAllTags = async () => {
    try {
        const tags = await databases.listDocuments(config.databaseId, config.tagsCollectionId)
        return tags.documents
    }
    catch (e) {
        throw new Error(e)
    }
}

export const postBid = async (form) => {
    try {
        const newBid = await databases.createDocument(config.databaseId, config.bidsCollectionId, ID.unique(), {
            message: form.message,
            buyer: form.buyer,
            offer: form.offer,
            listing: form.listing
        })

        return newBid
    }
    catch (e) {
        throw new Error(e)
    }
}

export const createLocation = async (data) => {
    try {
        let newLocation = { ...data }
        let address = `${data.address}, ${data.city}, ${data.state}`
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`)
        let geo_data = await response.json()
        let geocode = geo_data.results[0].geometry.location
        delete newLocation.$id
        const location = await databases.createDocument(config.databaseId, config.locationsCollectionId, ID.unique(),
            {
                ...newLocation,
                latitude: geocode.lat,
                longitude: geocode.lng
            }
        )
        return location.$id

    }
    catch (e) {
        throw new Error(e)
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(config.databaseId, config.videoCollectionId, ID.unique(), {
            title: form.title,
            thumbail: thumbnailUrl,
            video: videoUrl,
            prompt: form.prompt,
            users: form.userId
        })

        return newPost;
    }
    catch (e) {
        throw new Error(e)
    }
}

export const getCards = async (userId) => {
    try {
        const cards = await databases.listDocuments(config.databaseId, config.cardsCollectionId, [
            Query.equal('user', [userId])
        ])
        return cards.documents
    }
    catch (e) {
        throw new Error(e)
    }
}
