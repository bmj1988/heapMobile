import { View, Text, Modal, Pressable, TextInput, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import ListingTag from '../ListingTag'
import ListingImagesCarousel from './ListingImagesCarousel'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { getUserLocations, updateListing } from '../../lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { getAllTags } from '../../lib/appwrite'
import * as ImagePicker from 'expo-image-picker'
import TextPressable from '../TextPressable'
import { useSelector, useDispatch } from 'react-redux'
import { useGlobalContext } from '@/context/GlobalProvider'
import { editListingThunk } from '../../store/listings'


const EditListingDetailsModal = ({ listingId, isVisible, setVisible }) => {
    if (!listingId) return null
    const { user } = useGlobalContext()
    const listing = useSelector(state => state.listings.openListings[listingId])
    const defaultFormValues = {
        $id: listing.$id,
        details: listing.details,
        location: listing.location,
        askingPrice: listing.askingPrice,
        tags: listing.tags
    }
    const { data: tags } = useAppwrite(() => getAllTags())
    const [showAllTags, setShowAllTags] = useState(false)
    const [form, setForm] = useState(defaultFormValues)
    const [images, setImages] = useState(listing.images)
    const [deletedImages, setDeletedImages] = useState([])
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [disabled, setDisabled] = useState(!listing.isOpen)
    const [locations, setLocations] = useState([...user.locations, { address: "New Location", $id: 0 }])
    const dispatch = useDispatch()

    const openPicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync(
            {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                allowsMultipleSelection: true,
                selectionLimit: 3,
                aspect: [4, 3],
                quality: 1,
                disabled: disabled
            }
        )
        if (!result.canceled) {
            setImages(result.assets)
        }
    }

    const selectTag = (tag) => {
        if (disabled) return
        if (form.tags.includes(tag)) {
            let otherTags = form.tags.filter((filteredTag) => tag.$id !== filteredTag.$id)
            setForm({ ...form, tags: otherTags })
        }
        else if (form.tags.length === 3) return
        else {
            setForm({ ...form, tags: [...form.tags, tag] })
        }
    }

    const onModalClose = () => {
        setVisible(false)
        setForm(defaultFormValues)
        setShowAllTags(false)

    }
    const submitEdit = async () => {
        // in future need isLoading, setIsLoading
        await dispatch(editListingThunk({ form, images, deletedImages }))
        setVisible(false)
    }

    return (
        <Modal animationType="none"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => onModalClose()}>
            <View style={{ backgroundColor: 'rgba(0, 0, 0, .5)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ display: 'flex', justifyContent: 'space-between' }} className="rounded-2xl border-mint border-solid border-[1px] p-1 h-fit w-[85%] bg-black-100">

                        <View className="m-2">
                            <Text className="relative font-rssemibold text-white text-lg">{`Listing #${listing.$id}`}</Text>
                        </View>
                        <View className="justify-center items-center">
                            <ListingImagesCarousel images={images} setImages={setImages} own={true} imagePicker={openPicker} deletedImages={deletedImages} setDeletedImages={setDeletedImages} />
                        </View>



                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} className="m-2">
                            <Text className="text-white font-rssemibold">{"Asking Price"}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }} className="bg-black-200 border-[1px] border-gray-100 p-2 mr-2">
                                <Text className="text-mint text-lg font-rssemibold">{'$'}</Text>
                                <TextInput
                                    inputMode='numeric'
                                    value={form.askingPrice}
                                    className="text-mint text-xl font-rssemibold"
                                    onChangeText={(price) => setForm({ ...form, askingPrice: price })}
                                    onEndEditing={Keyboard.dismiss}
                                />
                            </View>
                        </View>
                        <View className="m-2" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                            {/* LOCATION */}
                            <Text className="text-white font-rssemibold mb-1">{"Location"}</Text>
                            <Pressable onPress={() => setDropdownVisible(!dropdownVisible)}>
                                <Text className="text-mint font-rssemibold mb-1 underline">{form.location.address}</Text>
                            </Pressable>
                            {
                                dropdownVisible && (
                                    <View style={{ position: 'absolute', bottom: 1 }} className="p-1 rounded-md m-1 bg-black-200">
                                        {locations.map((location) => (
                                            <Pressable key={location.$id} onPress={() => {
                                                setForm({ ...form, location: location })
                                                setDropdownVisible(false)
                                            }}>
                                                <Text className={`font-rssemibold color-mint bg-black-200 p-1`}>{location.address}</Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                )
                            }
                        </View>

                        {form.location.address === "New Location" && <View style={{ color: "#50bf88", flexDirection: 'row', justifyContent: 'flexStart', gap: 10, alignItems: 'center', marginBottom: 10, marginLeft: 10 }}>
                            <TextInput className="bg-gray-100 rounded-sm color-black p-1 w-[40%]"
                                placeholder='Street Address'
                                editable={!disabled}
                                onChangeText={(e) => setForm({ ...form, location: { ...form.location, address: e } })} />
                            <TextInput className="bg-gray-100 rounded-sm color-black p-1 w-[35%]"
                                placeholder='City'
                                editable={!disabled}
                                onChangeText={(e) => setForm({ ...form, location: { ...form.location, city: e } })} />
                            <TextInput className="bg-gray-100 rounded-sm color-black p-1 w-[12%]"
                                placeholder='State'
                                editable={!disabled}
                                maxLength={2}
                                onChangeText={(e) => setForm({ ...form, location: { ...form.location, state: e } })} />

                        </View>}
                        {/* DESCRIPTION */}
                        <View className="m-2">
                            <Text className="text-white font-rssemibold mb-1">{"Description"}</Text>
                            <TextInput
                                value={form.details}
                                editable={!disabled}
                                onChangeText={(details) => setForm({ ...form, details })}
                                numberOfLines={2}
                                className="text-white font-rsregular bg-black-200" />
                        </View>

                        <View className="m-2 h-[110px]">
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text className="text-white font-rssemibold mb-2">{"Tags"}</Text>
                                <Pressable onPress={() => setShowAllTags(!showAllTags)}>
                                    <Text className="text-white font-rsthin underline">{showAllTags ? "Finished editing tags" : "Edit tags"}</Text>
                                </Pressable>
                            </View>

                            {!showAllTags ? (
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    {form.tags.map((tag) => (
                                        <Pressable key={tag.$id}>
                                            <ListingTag tag={tag} textStyles={"color-black-100"} viewStyles={"bg-mint"} />
                                        </Pressable>))}
                                </View>
                            )
                                : (
                                    <FlatList
                                        contentConstainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                        data={tags}
                                        numColumns={3}
                                        renderItem={({ item }) => (
                                            <Pressable onPress={() => selectTag(item)} key={item.$id}>
                                                {
                                                    form.tags.map((tag) => tag.$id).includes(item.$id) ? (
                                                        <ListingTag tag={item} viewStyles={"bg-mint"} textStyles={"color-black-100"} />
                                                    ) : (
                                                        <ListingTag tag={item} />
                                                    )
                                                }

                                            </Pressable>)}
                                    />
                                )}


                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }} className="justify-around items-center">
                            <View>
                                <Pressable onPress={() => onModalClose()}>
                                    <AntDesign name="back" color="#DC143C" size={40} />
                                </Pressable>
                            </View>
                            <View>
                                <Pressable onPress={() => submitEdit()} disabled={form === defaultFormValues && !deletedImages.length}>
                                    <FontAwesome name="check" color="#50bf88" size={40} />
                                </Pressable>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    )
}

export default EditListingDetailsModal
