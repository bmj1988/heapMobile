import { View, Text, Pressable, Modal } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

const LocationPicker = ({ setLocation, currentLocation, locationsList, closeModal, visible }) => {

    return (
        <Modal

            transparent={true}
            visible={visible}
            onRequestClose={closeModal}>
            <View style={{ backgroundColor: 'rgba(0, 0, 0, .5)', flex: 1 }}>
                <View className="bg-black p-2 border-solid border-gray-100 border-[1px] rounded-sm" style={{ minWidth: '25%', margin: 'auto' }}>
                    <Text className="color-mint text-2xl font-rsbold underline">{"Pick a location"}</Text>
                    {
                        locationsList.map((location) => (

                            <Pressable key={location.$id} onPress={() => {
                                setLocation(location)
                                closeModal()
                            }}
                                className="flex-row items-center justify-between m-1 p-1">
                                <FontAwesome name={location.$id === currentLocation.$id ? "circle" : "circle-thin"} color={location.$id === currentLocation.$id ? "#50bf88" : "#CDCDE0"} size={18} />
                                <Text numberOfLines={1} ellipsizeMode='clip' className={`ml-1 font-rsregular text-lg ${location.$id === currentLocation.$id ? "color-mint" : "color-gray-100"}`}>{location.address}</Text>
                            </Pressable>
                        ))
                    }
                </View>
            </View>
        </Modal>
    )
}

export default LocationPicker
