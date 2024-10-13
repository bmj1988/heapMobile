import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'
import CustomButton from '../../../components/CustomButton'
import { Picker } from '@react-native-picker/picker'


const PostListingHeader = () => {
    const { user } = useGlobalContext()
    const [formOpen, setFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        images: [],
        details: '',
        location: null,
        askingPrice: "0",
        user: user.$id,
        tags: [],
    })

    return (
        <View className="w-[90%] bg-black-100 border-[1px] border-solid border-gray-100 justify-center items-center rounded-lg p-1 mb-5">
            <Pressable onPress={() => setFormOpen(!formOpen)}>
                <Text className="text-lg font-rssemibold color-mint">Post a Listing</Text>
            </Pressable>
            {formOpen &&
                <View>
                    <View>
                        <Text>Location</Text>
                        {/* Dropdown */}

                    </View>
                    <View>
                        <Text>Details</Text>
                        {/* TextArea */}

                    </View>
                    <View>
                        <Text>Asking Price</Text>
                        {/* Number input */}

                    </View>
                    <View>
                        <Text>Add Images</Text>
                        {/* Expo native image picker */}

                    </View>
                    <View>
                        <Text>Tags</Text>
                        {/* Dropdown */}

                    </View>
                    <CustomButton title={"Submit"} handlePress={() => postListing(form)} isLoading={isLoading} />
                </View>}
            <View>

            </View>

        </View>

    )
}

export default PostListingHeader
