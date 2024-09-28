import { View, Text, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import CustomButton from './CustomButton'
import { FontAwesome } from '@expo/vector-icons'
import ListingDetailsModal from './Modals/ListingDetailsModal'

const HighlightedListing = ({ listing }) => {
    const [bid, setBid] = useState(0.00)
    const [message, setMessage] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    if (!listing) return (<></>)

    return (
        <View className="w-[90%] bg-black-100 border-[1px] border-solid border-gray-100 justify-center items-center rounded-lg p-1 mb-5">
            <Text className="text-lg font-rssemibold color-gray-100">Bid</Text>
            <View className="flex-row justify-between items-center w-[100%]">
                <View className="justify-center items-center m-1">
                    <Text className="text-md font-rsregular color-gray-100">Make an offer</Text>
                    <TextInput
                        inputMode='decimal'
                        keyboardType='decimal-pad'
                        className="bg-gray-100 color-black rounded-sm w-20 h-[40px]"
                        value={bid}
                        onChangeText={(e) => {
                            const valid = e.match(/^(\d*\.{0,1}\d{0,2}$)/)
                            if (valid) setBid(e)

                        }
                        } />
                </View>
                <View className="justify-center items-center m-1">
                    <Text className="text-md font-rsregular color-gray-100">Attach a message <Text className="text-sm font-rsthin">{"(optional)"}</Text></Text>
                    <TextInput
                        inputMode='text'
                        value={message}
                        onChangeText={(e) => setMessage(e)}
                        numberOfLines={2}
                        multiline={true}
                        rows={2}
                        maxLength={200}
                        className="bg-gray-100 w-[180px] h-[40px] color-black rounded-sm"
                    />
                </View>
            </View>
            <View className="flex-row justify-between w-[100%] px-7 py-3">
                <View>
                    <FontAwesome name='close' color={'#DC143C'} size={50} />
                </View>
                <View>
                    <FontAwesome name='send' color={'#50bf88'} size={50} />
                </View>
            </View>
            <View className="w-[full] justify-center">
                <Pressable onPress={() => setModalVisible(true)}>
                    <Text className="text-sm font-thin color-gray-100 underline">See full listing details</Text>
                </Pressable>
            </View>
            <ListingDetailsModal listing={listing} isVisible={modalVisible} setVisible={() => setModalVisible()} />
        </View>
    )
}

export default HighlightedListing
