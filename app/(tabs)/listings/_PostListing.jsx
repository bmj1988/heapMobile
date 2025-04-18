import { View, Text, Pressable, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'
import CustomButton from '../../../components/CustomButton'
import { getAllTags } from '@/lib/appwrite'
import * as ImagePicker from 'expo-image-picker'
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import useAppwrite from '@/lib/useAppwrite'
import LocationPicker from '../../../components/Modals/PostListingHeaderLocationPicker'
import keyboardOpen from '../../../hooks/keyboardOpen'
import TagSelectionModal from '../../../components/Modals/TagSelectionModal'
import { useDispatch } from 'react-redux'
import { postListingThunk } from '@/store/listings'

const PostListingHeader = () => {
    const { user } = useGlobalContext()
    const dispatch = useDispatch()
    const [formOpen, setFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [tagModalVisible, setTagModalVisible] = useState(false)
    const { data: tags } = useAppwrite(() => getAllTags())
    const [locations, setLocations] = useState([...user.locations, { address: "New Location", city: "", state: "", $id: 0 }])
    const [currentLocation, setCurrentLocation] = useState(locations[0])
    const isKeyboardOpen = keyboardOpen();
    const [form, setForm] = useState({
        images: [],
        details: '',
        location: { address: currentLocation.address, city: currentLocation.city, state: currentLocation.state, $id: currentLocation.$id },
        askingPrice: 0,
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
    }

    // ideally would animate some kind of check mark or success indicator
    const submit = async () => {
        setIsLoading(true)
        let newListing = { ...form }
        newListing.location = currentLocation;
        if (!newListing.askingPrice) newListing.askingPrice = "0"
        else newListing.askingPrice = newListing.askingPrice.toString()
        await dispatch(postListingThunk(newListing))

        setForm({
            images: [],
            details: '',
            location: currentLocation,
            askingPrice: 0,
            user: user.$id,
            tags: [],
        })
        setFormOpen(false)
        setIsLoading(false)
    }

    return (
        <View className="max-w-auto bg-black-200 border-[1px] border-solid border-mint justify-center items-center rounded-lg p-1 mr-1 ml-1 mb-5">
            <Pressable className={`flex-row items-center justify-center gap-5 ${isKeyboardOpen ? "hidden" : ""}`} onPress={() => setFormOpen(!formOpen)}>
                <Text className="text-2xl font-rssemibold color-mint">Post a Listing</Text>
                <MaterialCommunityIcons name={'cube-send'} color={'#50bf88'} size={40} />
            </Pressable>
            {formOpen &&
                <View style={{ width: '90%' }}>
                    <View style={{ color: "#50bf88", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 1, marginBottom: 10 }}>
                        <Text className="color-mint font-rsregular text-lg">Location</Text>
                        <Pressable onPress={() => setModalVisible(true)} className="gap-1 flex-row items-center">
                            <Text className="color-mint font-rsregular text-lg underline">{currentLocation.address}</Text>
                            <Ionicons name="location-outline" color="#50bf88" size={20} />
                        </Pressable>
                    </View>
                    {currentLocation.address === "New Location" && <View style={{ color: "#50bf88", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 1, marginBottom: 10 }}>
                        <TextInput className="bg-gray-100 rounded-sm color-black p-1 w-[40%]"
                            placeholder='Street Address'
                            onChangeText={(e) => setForm({ ...form, location: { ...form.location, address: e } })} />
                        <TextInput className="bg-gray-100 rounded-sm color-black p-1 w-[35%]"
                            placeholder='City'
                            onChangeText={(e) => setForm({ ...form, location: { ...form.location, city: e } })} />
                        <TextInput className="bg-gray-100 rounded-sm color-black p-1 w-[12%]"
                            placeholder='State'
                            maxLength={2}
                            onChangeText={(e) => setForm({ ...form, location: { ...form.location, state: e } })} />
                    </View>}
                    <View style={{ color: "#50bf88", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 1, marginBottom: 10 }}>
                        <Text className="color-mint font-rsregular text-lg">Asking Price</Text>
                        {/* Number input consider "number-pad" as keyboardTyope value*/}
                        <TextInput className="bg-gray-100 rounded-sm color-black p-1"
                            keyboardType={"numeric"}
                            onChangeText={(askingPrice) => setForm({ ...form, askingPrice })}
                            placeholder='Best Offer' />

                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {/* Consider having this be a pressable that opens a modal to type details into */}
                        <Text className="color-mint font-rsregular text-lg">Details</Text>
                        <TextInput className="color-black bg-gray-100 w-[90%] mb-1" numberOfLines={2} multiline={true} onChangeText={(details) => setForm({ ...form, details })} />

                    </View>

                    <View>
                        <View className="m-2 rounded-2xl border-solid border-mint border-[1px]">
                            <Pressable className="flex-row justify-center items-center p-1" onPress={() => openPicker()}>
                                <Text className="color-mint font-rsregular text-lg mr-2">{`${form.images.length > 0 ? "Change" : "Upload"} Images`}</Text>
                                <FontAwesome name={"upload"} color={"#50bf88"} size={20} />
                            </Pressable>
                        </View>
                        <View className="flex-row">
                            {form.images.length > 0 && form.images.map((image) => {
                                <Image
                                    source={{ uri: image.uri }}
                                    className="w-[64px] h-[64px] rounded-xl"
                                    resizeMode='contain' />
                            })
                            }
                        </View>

                    </View>
                    <View>
                        <Pressable onPress={() => setTagModalVisible(true)} className="flex-row justify-center items-center m-1 p-1 rounded-2xl border-solid border-mint border-[1px]">
                            <Text className="color-mint font-rsregular text-lg mr-1">{`${form.tags.length > 0 ? "Edit" : "Add"} Tags`}</Text>
                            <MaterialCommunityIcons name={"tag-plus-outline"} color={"#50bf88"} size={25} />
                        </Pressable>

                    </View>
                    <CustomButton title={"Submit"} handlePress={() => submit()} isLoading={isLoading || !form.location.address || !form.location.city || !form.location.state} containerStyles={"m-2"} />
                </View>}
            <View>

            </View>
            <LocationPicker setLocation={setCurrentLocation} currentLocation={currentLocation} locationsList={locations} closeModal={() => setModalVisible(false)} visible={modalVisible} />
            <TagSelectionModal visible={tagModalVisible} closeModal={() => setTagModalVisible(false)} form={form} setForm={setForm} tagList={tags} currentTags={form.tags} />
        </View>

    )
}

export default PostListingHeader
