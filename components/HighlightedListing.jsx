import { View, Text, TextInput } from 'react-native'
import { useState } from 'react'

const HighlightedListing = ({ listing }) => {
    const [bid, setBid] = useState(0.00)
    const [message, setMessage] = useState('')

    if (!listing) return (<></>)

    return (
        <View className="w-[90%] bg-black-100 border-[1px] border-solid border-gray-100 justify-center items-center rounded-lg">
            <Text className="text-lg font-rssemibold color-gray-100">Bid</Text>
            <View className="flex-row justify-between items-center w-[100%]">
                <View className="justify-center items-center m-1">
                    <Text className="text-md font-rsregular color-gray-100">Make an offer</Text>
                    <TextInput
                        inputMode='decimal'
                        keyboardType='decimal-pad'
                        className="bg-gray-100 color-black rounded-sm"
                        value={bid}
                        onChangeText={(e) => {
                            const valid = e.match(/^(\d*\.{0,1}\d{0,2}$)/)
                            if (valid) setBid(e.target.value)

                        }
                        } />
                </View>
                <View className="justify-center items-center m-1">
                    <Text className="text-md font-rsregular color-gray-100">Attach a message <Text className="text-sm font-rsthin">{"(optional)"}</Text></Text>
                    <TextInput
                        inputMode='text'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        numberOfLines={2}
                        multiline={true}
                        rows={2}
                        maxLength={200}
                        className="bg-gray-100 color-black rounded-sm"
                    />

                </View>
            </View>
            <View className="w-[full] justify-end">
                <Text className="text-sm font-thin color-gray-100 underline">See full listing details</Text>
            </View>
        </View>
    )
}

export default HighlightedListing
