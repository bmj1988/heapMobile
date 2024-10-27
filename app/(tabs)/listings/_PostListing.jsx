import { View, Text, Pressable, TextInput } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'
import CustomButton from '../../../components/CustomButton'
import { Picker } from '@react-native-picker/picker'
import { getUserLocations } from '@/lib/appwrite'
import * as ImagePicker from 'expo-image-picker'


const PostListingHeader = () => {
    const { user } = useGlobalContext()
    const [formOpen, setFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { data: locations } = useAppwrite(() => getUserLocations(user.$id))

    const [form, setForm] = useState({
        images: [],
        details: '',
        location: {},
        askingPrice: "0",
        user: user.$id,
        tags: [],
    })

    const openPicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync(
            {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                allowsMultipleSelection: true,
                selectionLimit: 3,
                aspect: [4, 3],
                quality: 1
            }
        )
        if (!result.canceled) {
            setForm({ ...form, images: result.assets })
        }
        else {
            setTimeout(() => {
                Alert.alert('Document picked', JSON.stringify(result, null, 2))
            }, 100)
        }
    }

    return (
        <View className="w-[90%] bg-black-100 border-[1px] border-solid border-gray-100 justify-center items-center rounded-lg p-1 mb-5">
            <Pressable onPress={() => setFormOpen(!formOpen)}>
                <Text className="text-lg font-rssemibold color-mint">Post a Listing</Text>
            </Pressable>
            {formOpen &&
                <View>
                    <View>
                        <Text>Location</Text>
                        <Picker
                            selectedValue={form.location}
                            onValueChange={(itemValue, itemIndex) => setForm({ ...form, location: itemValue })}
                        >
                            {locations && locations.map((item) => {
                                <Picker.Item key={item.$id} label={item.address} value={item.$id} />
                            })}
                            <Picker.Item key={0} label={"New location"} value={0} />
                        </Picker>
                    </View>
                    <View>
                        <Text>Asking Price</Text>
                        {/* Number input consider "number-pad" as keyboardTyope value*/}
                        <TextInput keyboardType={"numeric"} onChange={(askingPrice) => setForm({ ...form, askingPrice })} defaultValue='Best Offer' />

                    </View>

                    <View>
                        <Text>Details</Text>
                        <TextInput multiline={true} onChangeText={(details) => setForm({ ...form, details })} />

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
