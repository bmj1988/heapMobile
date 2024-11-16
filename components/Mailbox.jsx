import { View, Text, Pressable, FlatList } from 'react-native'
import React from 'react'
import EmptyState from './EmptyState'

const Mailbox = ({ messages, setSelected, setVisible }) => {
    return (
        <FlatList
            data={messages}
            style={{ marginLeft: 20, marginTop: 10, maxHeight: (messages.length * 40), width: "100%" }}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <Pressable onPress={() => {
                    setSelected(item)
                    setVisible()
                }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className="rounded-xl bg-black-100 h-fit w-[90%]">
                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <Text numberOfLines={1} className={`text-md mr-1 color-mint ${item.seen ? 'font-rsregular' : 'font-rsbold'}`}>{item.sender.username}</Text>
                            <Text numberOfLines={1} className={`text-md mr-1 color-mint max-w-[30%] ${item.seen ? 'font-rsregular' : 'font-rsbold'}`}>{item.content}</Text>
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
