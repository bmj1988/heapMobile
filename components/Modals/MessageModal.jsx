import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'

const MessageModal = ({ message, visible, close, user }) => {

    const currentUserIsSender = message.sender && message.sender.$id === user.$id ? true : false

    return (
        <Modal
            animationType='none'
            transparent={true}
            visible={visible}>
            <View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>From: {currentUserIsSender ? "You" : user.username}</Text>
                    <Text>Sent: {message.$createdAt}</Text>
                </View>
                <Text>{message.content}</Text>
                <Pressable onPress={() => close()}>
                    <Text>Close Modal</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

export default MessageModal
