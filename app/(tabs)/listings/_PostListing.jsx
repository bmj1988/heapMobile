import { View, Text, Pressable, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'
import CustomButton from '../../../components/CustomButton'
import { Picker } from '@react-native-picker/picker'
import { getUserLocations, getAllTags, postListing } from '@/lib/appwrite'
import * as ImagePicker from 'expo-image-picker'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import useAppwrite from '@/lib/useAppwrite'



const PostListingHeader = () => {
    const { user } = useGlobalContext()
    const [formOpen, setFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { data: locations } = useAppwrite(() => getUserLocations(user.$id))
    const { data: tags } = useAppwrite(() => getAllTags())

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
    // ideally would animate some kind of check mark or success indicator
    const submit = async () => {
        const listing = postListing(form)
        setForm({
            images: [],
            details: '',
            location: {},
            askingPrice: "0",
            user: user.$id,
            tags: [],
        })
        setFormOpen(false)
    }

    return (
        <View className="max-w-auto bg-black-200 border-[1px] border-solid border-mint justify-center items-center rounded-lg p-1 m-1 mb-5">
            <Pressable className="flex-row items-center justify-center gap-5" onPress={() => setFormOpen(!formOpen)}>
                <Text className="text-2xl font-rssemibold color-mint">Post a Listing</Text>
                <MaterialCommunityIcons name={'cube-send'} color={'#50bf88'} size={40} />
            </Pressable>
            {formOpen &&
                <View>
                    <View>
                        <Text>Location</Text>
                        {/* <Picker
                            selectedValue={form.location}
                            onValueChange={(itemValue, itemIndex) => setForm({ ...form, location: itemValue })}
                        >
                            {locations && locations.map((item) => {
                                <Picker.Item key={item.$id} label={item.address} value={item.$id} />
                            })}
                            <Picker.Item key={0} label={"New location"} value={0} />
                        </Picker> */}
                    </View>
                    <View>
                        <Text>Asking Price</Text>
                        {/* Number input consider "number-pad" as keyboardTyope value*/}
                        {/* <TextInput keyboardType={"numeric"} onChange={(askingPrice) => setForm({ ...form, askingPrice })} defaultValue='Best Offer' /> */}

                    </View>

                    <View>
                        {/* Consider having this be a pressable that opens a modal to type details into */}
                        <Text>Details</Text>
                        <TextInput multiline={true} onChangeText={(details) => setForm({ ...form, details })} />

                    </View>

                    <View>
                        <Text>Upload Images</Text>
                        {/* Expo native image picker */}
                        {/* <Pressable onPress={() => openPicker()}>
                            <FontAwesome name={"upload"} color={"black"} size={20} />
                        </Pressable>
                        <View className="flex-row">
                            {form.images.length > 0 && form.images.map((image) => {
                                <Image
                                    source={{ uri: image.uri }}
                                    className="w-[64px] h-[64px] rounded-xl"
                                    resizeMode='contain' />
                            })
                            }
                        </View> */}

                    </View>
                    <View>
                        <Text>Tags</Text>
                        {/* <Picker
                            selectedValue={form.location}
                            onValueChange={(itemValue, itemIndex) => {
                                if (form.tags.includes(itemValue)) return
                                else setForm({ ...form, tags: [...form.tags, itemValue]})
                            }}
                        >
                            {tags && tags.map((item) => {
                                <Picker.Item key={item.$id} label={item.name} value={item.$id} />
                            })}
                            <Picker.Item key={0} label={"Add a tag"} value={0} />
                        </Picker> */}

                    </View>
                    <CustomButton title={"Submit"} handlePress={() => submit()} isLoading={isLoading} />
                </View>}
            <View>

            </View>

        </View>

    )
}

export default PostListingHeader
