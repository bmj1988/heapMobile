import { View, Text, Pressable, FlatList } from 'react-native'
import React from 'react'

const Mailbox = ({ messages, setSelected, setVisible, sent = false }) => {
    return (
        <FlatList
            data={messages}
            style={{ marginLeft: 20, marginTop: 10, maxHeight: (messages.length * 40), width: "100%" }}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <Pressable style={{ height: 'auto' }} onPress={() => {
                    console.log('click')
                    setSelected(item)
                    setVisible()
                }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className="rounded-xl bg-black-100 h-fit w-[90%]">
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '40%' }}>
                            <Text numberOfLines={1} className={`text-md mr-1 color-mint ${item.seen ? 'font-rsregular' : 'font-rsbold'}`}>{sent ? item.recipient.username : item.sender.username}</Text>
                            <Text numberOfLines={1} className={`text-md color-mint max-w-[100px] ${item.seen ? 'font-rsregular' : 'font-rsbold'}`}>{item.content}</Text>
                        </View>
                        <Text style={{ textAlign: 'right' }} numberOfLines={1} className={`text-md color-mint ${item.seen ? 'font-rsregular' : 'font-rsbold'}`}>{new Date(item.$createdAt).toLocaleString()}</Text>
                    </View>
                </Pressable>
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
