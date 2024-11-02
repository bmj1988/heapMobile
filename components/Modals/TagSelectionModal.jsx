import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import ListingTag from '../ListingTag'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const TagSelectionModal = ({ visible, closeModal, form, setForm, tagList }) => {

    return (
        <Modal

            transparent={true}
            visible={visible}
            onRequestClose={closeModal}>
            <View style={{ backgroundColor: 'rgba(0, 0, 0, .5)', flex: 1 }}>
                <View className="bg-black p-2 border-solid border-gray-100 border-[1px] rounded-sm justify-center items-center" style={{ minWidth: '25%', margin: 'auto' }}>
                    <Text className="color-mint text-2xl font-rsbold underline">{"Add tags to your listing"}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: 350, marginBottom: 10 }}>
                        {
                            tagList.map((tag) => {
                                const selected = form.tags.includes(tag.$id)
                                return (
                                    <Pressable key={tag.$id} onPress={() => {
                                        console.log("click")
                                        console.log(form.tags)
                                        if (selected) {
                                            setForm({ ...form, tags: form.tags.filter((currentTag) => currentTag !== tag.$id) })
                                        }
                                        else if (form.tags.length < 3) {

                                            setForm({ ...form, tags: [...form.tags, tag.$id] })
                                        }
                                    }}
                                        className="flex-row items-center justify-between m-1 p-1">
                                        <ListingTag tag={tag}
                                            viewStyles={selected ? "border-mint bg-mint" : ""}
                                            textStyles={selected ? "color-black-100" : ""} />
                                    </Pressable>
                                )
                            })
                        }
                    </View>
                    <Text className="text-sm font-rsthin color-mint mb-2">Select up to 3 tags</Text>
                    <Pressable onPress={() => closeModal()}>
                        <MaterialCommunityIcons name={"close"} color={"#50bf88"} size={50} />
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default TagSelectionModal
