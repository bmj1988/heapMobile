// the goal here is, after a successful validation of login
// update user location
// ideally have the server do the haversine distance on all listings
// to grab the entire USER object with the attributes we need (lots of relations)
//
// to grab the feed
// to grab messages (new message indicator)
// to grab listings (paginated)
// HOME route
import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite'
import { haversineDistance } from './utils';

export default async ({ req, res, log, error }) => {
    const client = new Client();
    const account = new Account(client);
    const databases = new Databases(client);
    const { config, password, latitude, longitude, page } = req
    client
        .setEndpoint(config.endpoint)
        .setProject(config.projectId)
        .setPlatform(config.platform)

    if (req.path === "/login") {
        const email = req.email.toLowerCase()
        const session = await account.createEmailPasswordSession(email, password)
        if (!session) return res.text('Account not found')
        let response = await databases.listDocuments(config.databaseId, config.userCollectionId, [Query.equal('accountId', currentAccount.$id)])
        let user = response.documents[0]
        if (!user) return res.text('User not found')
        const userId = user.$id
        const lastUpdate = user.$updatedAt
        const prevLong = user.longitude
        const prevLat = user.latitude
        if (haversineDistance(latitude, longitude, prevLat, prevLong) > 10 || (Math.abs(Date.now() - new Date(lastUpdate)) / (1000 * 60) > 30)) {
            user = await databases.updateDocument(config.databaseId, config.userCollectionId, userId, {
                latitude,
                longitude
            })
        }
        const feed = await databases.listDocuments(config.databaseId,
            config.listingsCollectionId,
            [
                Query.notEqual('user', [userId]),
                Query.equal('isOpen', true),
                Query.orderDesc('$createdAt'),
                Query.limit(5),
                Query.offset((5 * page) - 5)
            ]
        );
        for (listing in feed.documents) {
            listing["distance"] = haversineDistance(latitude, longitude, listing.latitude, listing.longitude)
        }
        let newMessageNotification = false;
        for (let message in user.messages) {
            if (!message.read) {
                newMessageNotification = true
                return
            }
        }
        const homePage = {
            user,
            feed: [...feed.documents],
            newMessageNotification
        }

        return res.json(homePage)


    }


}
