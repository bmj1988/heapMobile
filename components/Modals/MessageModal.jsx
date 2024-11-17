import { View, Text, Modal, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../CustomButton'
import { sendMessage } from '../../lib/appwrite'


const MessageModal = ({ message, visible, close, user }) => {
    const [reply, setReply] = useState(false)
    const [sendReply, setSendReply] = useState(false)
    const currentUserIsSender = message.sender && message.sender.$id === user.$id ? true : false

    const send = () => {
        const newMessage = {
            content: reply,
            sender: message.recipient.$id,
            recipient: message.sender.$id,
        }
        let response = sendMessage(newMessage)
        console.log(response)
        close()
    }

    return (
        <Modal
            animationType='none'
            transparent={true}
            visible={visible}
            onRequestClose={() => close()}>
            <View className="flex-1 max-h-[70%]">
                <View className="m-auto justify-between items-center w-[80%] rounded-2xl border-mint border-solid border-[1px] p-2 bg-black-100">
                    <View style={{ display: 'flex', justifyContent: 'space-between', borderBottomWidth: 1, borderStyle: 'solid' }} className="border-mint mb-1">
                        <Text className="text-xl font-rssemibold color-mint">{currentUserIsSender ? "To:" : "From:"} {currentUserIsSender ? message.recipient.username : user.username}</Text>
                        <Text className="text-xl font-rssemibold color-mint">Sent: {new Date(message.$createdAt).toLocaleString()}</Text>
                    </View>
                    <Text className="text-lg font-rsregular color-mint w-[90%] align-left" style={{ overflow: 'scroll', marginBottom: 30 }}>{message.content}</Text>
                    {sendReply && <TextInput
                        multiline={true}
                        numberOfLines={3}
                        style={{ backgroundColor: "#EEEEEE", width: "90%", height: 40, marginBottom: 30 }}
                        className="rounded-lg font-rsregular"
                        onChangeText={(e) => setReply(e)}
                        placeholder='Type your reply here' />}
                    <View style={{ flexDirection: "row", justifyContent: 'center', width: '90%' }}>
                        <CustomButton title={"Close"} handlePress={() => {
                            setSendReply(false)
                            close()
                        }
                        } containerStyles={"bg-carmine w-[50%] mr-1 min-h-[45px]"} />
                        {!currentUserIsSender && <CustomButton title={sendReply ? "Send" : "Reply"} handlePress={sendReply ? () => send() : () => setSendReply(true)} containerStyles={"bg-mint w-[50%] ml-1 min-h-[45px]"} />}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default MessageModal
