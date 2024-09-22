import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite'

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.bmj1988.heap',
    projectId: '66e7901f002017814f2c',
    databaseId: '66ef5fa60020efdea248',
    userCollectionId: '66ef5fbd002b3f9cd396',
    imagesCollectionId: '66ef609b003a8528e80b',
    cardsCollectionId: '66ef60d4003847033362',
    locationsCollectionId: '66ef608800167a45a5a0',
    bidsCollectionId: '66ef605f003baced4f05',
    messagesCollectionId: '66ef5fd90004fb5b01e9',
    listingsCollectionId: '66ef5fc9002d09e1bfdf',
    reviewsCollectionId: '66ef73820006cdb5b69b',
    recordsCollectionId: '66ef719d0008fc92dae0',
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
        const newAccount = await account.create(ID.unique(), email, password, username)
        if (!newAccount) throw Error;

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
        return newUser
    }
    catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
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
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0]
    }
    catch {
        console.log(error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.orderDesc('$createdAt')])
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


export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.search('title', query)])
        return posts.documents;
    }
    catch (e) {
        throw new Error(e)
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.equal('users', userId)])
        return posts.documents;
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


export const uploadFile = async (file, type) => {
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
        return fileUrl
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
