import { Client, Databases, Query } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
    // You can use the Appwrite SDK to interact with other services
    // For this example, we're using the Users service
    const client = new Client()

    client
        .setEndpoint(process.env.APPWRITE_FUNCTION_1_API_ENDPOINT)
        .setProject(process.env.APPWRITE_FUNCTION_1_PROJECT_ID)
        .setKey(process.env.API_KEY);

    const databases = new Databases(client)

    const { username, tag, listingTag, price, material } = req.query

    if (username) {
        // searches by USERNAME, which include the User relation which we will use to populate a profile link
        const users = await databases.listDocuments(process.env.DATABASE_ID, process.env.USER_COLLECTION_ID, [
            Query.seach('username', username)
        ])

        res.json({ results: { type: 'users', data: users } })

    }
    else if (material) {
        // searches by MATERIAL full text index and returns cards, which include the User relation which we will use to populate a profile link
        const cards = await databases.listDocuments(process.env.DATABASE_ID, process.env.CARD_COLLECTION_ID, [
            Query.search('material', material),
            Query.greaterThanEqual('price', price)
        ])

        res.json({ results: { type: 'cards', data: cards } })

    }
    else if (tag) {
        // searches by TAG ID and returns cards, which include the User relation which we will use to populate a profile link
        const cards = await databases.listDocuments(process.env.DATABASE_ID, process.env.CARD_COLLECTION_ID, [
            Query.equal('tags', tag),
            Query.greaterThanEqual('price', price)
        ])
        res.json({ results: { type: 'cards', data: cards } })
    }
    else if (listingTag) {
        // searches by TAG ID and returns listings, which we will use to populate a single listing page or component, most likely a modal
        const listings = await databases.listDocuments(process.env.DATABASE_ID, process.env.LISTING_COLLECTION_ID, [
            Query.equal('tags', listingTag)
        ])
        res.json({ results: { type: 'listing', data: listings } })
    }


    return res.json({
        motto: "Build like a team of hundreds_",
        learn: "https://appwrite.io/docs",
        connect: "https://appwrite.io/discord",
        getInspired: "https://builtwith.appwrite.io",
    });
};
