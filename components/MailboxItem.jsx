import { View, Text, Pressable, FlatList } from 'react-native'
import { useState } from 'react'
import { markSeen } from '../lib/appwrite'

const MailboxItem = ({ item, setVisible, sent, setSelected }) => {
    const [seen, setSeen] = useState(item.seen)

    return (
        <Pressable style={{ height: 'auto', marginTop: 10 }} onPress={() => {
            markSeen(item.$id)
            setSeen(true)
            setSelected(item)
            setVisible()
        }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className={`rounded-xl ${seen ? "bg primary" : "bg-black-100"} h-fit w-[90%]`}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '40%' }}>
                    <Text numberOfLines={1} className={`text-lg mr-1 ${seen ? 'font-rsregular color-mint-100' : 'font-rsbold color-mint'}`}>{sent ? item.recipient.username : item.sender.username}</Text>
                    <Text numberOfLines={1} className={`text-lg max-w-[100px]${seen ? 'font-rsregular color-mint-100' : 'font-rsbold color-mint'}`}>{item.content}</Text>
                </View>
                <Text style={{ textAlign: 'right' }} numberOfLines={1} className={`text-lg ${seen ? 'font-rsregular color-mint-100' : 'font-rsbold color-mint'}`}>{new Date(item.$createdAt).toLocaleString()}</Text>
            </View>
        </Pressable>
    )
}

export default MailboxItem
