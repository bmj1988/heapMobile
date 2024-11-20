import { View, Text, Pressable, FlatList } from 'react-native'
import React from 'react'
import { markSeen } from '../lib/appwrite'
import MailboxItem from './MailboxItem'

const Mailbox = ({ messages, setSelected, setVisible, sent = false }) => {
    return (
        <FlatList
            data={messages}
            style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, maxHeight: (messages.length * 40), width: "100%" }}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <MailboxItem item={item} setVisible={() => setVisible()} sent={sent} setSelected={setSelected} />
            )}
            ListEmptyComponent={() => (
                <Text className="text-xl color-mint font-rssemibold">{"There are no messages to display at this time."}</Text>
            )
            }
        >
        </FlatList>
    )

}

export default Mailbox
