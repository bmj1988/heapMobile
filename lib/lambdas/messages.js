const appwriteHeaders = {
    "X-Appwrite-Project": process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

const messagesDomain = `https://${process.env.EXPO_PUBLIC_MESSAGES_FUNCTION_DOMAIN}`

export const sendMessage = async (message) => {
    const response = await fetch(`${messagesDomain}/sendMessage`, {
        method: "POST",
        body: JSON.stringify(message),
        headers: appwriteHeaders
    })
    const message = await response.json()
    if (message.success) return message.newMessage
    return message.error
}
