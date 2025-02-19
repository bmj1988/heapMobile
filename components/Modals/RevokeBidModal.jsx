import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'

const RevokeBidModal = ({ isVisible, setVisible, onRevoke }) => {
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setVisible(false)}
        >
            <View className="flex-1 justify-center items-center absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)]">
                <View className="rounded-2xl border-mint border-solid border-[1px] flex flex-col w-[80%] bg-black-100 p-6">
                    {/* Warning Text */}
                    <Text className="text-white font-rsregular text-center mb-6">
                        If a bid is revoked before its expiration date, the bidder will be able to rate your transaction negatively.
                    </Text>

                    {/* Buttons */}
                    <View className="flex-row justify-center space-x-8">
                        <Pressable
                            onPress={() => setVisible(false)}
                            className="bg-gray-600 px-6 py-2 rounded-lg"
                        >
                            <Text className="text-white font-rsmedium">Back</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                onRevoke();
                                setVisible(false);
                            }}
                            className="bg-red-500 px-6 py-2 rounded-lg"
                        >
                            <Text className="text-white font-rsmedium">Revoke</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default RevokeBidModal
