import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite'

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.bmj1988.my-app',
    projectId: '66e7901f002017814f2c',
    databaseId: '66e7917700127ac48fa5',
    userCollectionId: '66e791b9001100e3919b',
    videoCollectionId: '66e791de003563d93358',
    storageId: '66e7931f0022538ef0d9'

}


const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username)
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)
        await signIn(email, password)
        const newUser = await databases.createDocument(appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
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
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
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
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.orderDesc('$createdAt')])
        return posts.documents;
    }
    catch (e) {
        throw new Error(e)
    }
}
export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.orderDesc('$createdAt', Query.limit(7))])
        return posts.documents;
    }
    catch (e) {
        throw new Error(e)
    }
}


export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.search('title', query)])
        return posts.documents;
    }
    catch (e) {
        throw new Error(e)
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.equal('users', userId)])
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
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100)
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
            appwriteConfig.storageId,
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

        const newPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, ID.unique(), {
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
