import { Client, Users, Databases } from 'node-appwrite';
import { haversineDistance } from './utils';
// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
    // You can use the Appwrite SDK to interact with other services
    // For this example, we're using the Users service
    const client = new Client()

    client
        .setEndpoint(process.env.APPWRITE_FUNCTION_1_API_ENDPOINT)
        .setProject(process.env.APPWRITE_FUNCTION_1_PROJECT_ID)
        .setKey(process.env.API_KEY)
        ;

    const databases = new Databases(client)
    // The req object contains the request data
    if (req.path === "/ping") {
        // Use res object to respond with text(), json(), or binary()
        // Don't forget to return a response!
        return res.text("Pong");
    }

    if (req.path === "/current") {
        try {
            const userId = req.query.userId
            const user = await databases.getDocument(process.env.APPWRITE_FUNCTION_1_DATABASE_ID, process.env.APPWRITE_USER_COLLECTION_ID, userId)
            if (!user) return res.json({ error: "user not found" })
            return res.json(user)
        }
        catch (e) {
            console.log(e)
            return res.json(e)
        }
    }

    if (req.path === "/feed") {

        const { 'x-longitude': longitude, 'x-latitude': latitude, 'x-userid': userId } = req.headers;
        const page = req.query.page || 1

        try {
            const result = await databases.listDocuments(process.env.APPWRITE_FUNCTION_1_DATABASE_ID,
                process.env.APPWRITE_LISTINGS_COLLECTION_ID,
                [
                    Query.notEqual('user', [userId]),
                    Query.equal('isOpen', true),
                    Query.orderDesc('$createdAt'),
                    Query.limit(5),
                    Query.offset((5 * page) - 5)
                ]
            );

            // WITH ACTUAL SQL WE CAN BUILD A QUERY THAT SORTS RESULTS BY HAVERSINE DISTANCE
            const listings = result.documents
            for (let listing of listings) {
                listing['distance'] = haversineDistance(latitude, longitude, listing.location.latitude, listing.location.longitude)
            }
            let sortedListings = listings.sort((a, b) => a.distance - b.distance)

            return res.json(sortedListings)
        }
        catch (e) {
            throw new Error(e)
        }
    }

    return res.json({
        motto: "Build like a team of hundreds_",
        learn: "https://appwrite.io/docs",
        connect: "https://appwrite.io/discord",
        getInspired: "https://builtwith.appwrite.io",
    });
};
