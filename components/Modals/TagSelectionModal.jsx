import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import ListingTag from '../ListingTag'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const TagSelectionModal = ({ visible, closeModal, form, setForm, tagList, card }) => {
    // Maybe this could be handled more elegantly with more dev time, but so could everything else
    const limit = card ? 1 : 3

    return (
        <Modal

            transparent={true}
            visible={visible}
            onRequestClose={closeModal}>
            <View style={{ backgroundColor: 'rgba(0, 0, 0, .5)', flex: 1 }}>
            </View>

            <View className="bg-black p-2 border-solid border-gray-100 border-[1px] rounded-sm justify-center items-center" style={{ minWidth: '25%', marginBottom: '50%' }}>
                <Text className="color-mint text-2xl font-rsbold underline">{"Add tags to your listing"}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: 350, marginBottom: 10 }}>
                    {
                        tagList.map((tag) => {
                            const selected = card ? form.tags === tag.$id : form.tags.includes(tag.$id)
                            return (
                                <Pressable key={tag.$id} onPress={() => {

                                    if (card && selected) {
                                        setForm({ ...form, tags: null })
                                    }
                                    else if (card) {
                                        console.log(form.material, tag.name)
                                        setForm({ ...form, tags: tag.$id, material: tag.name })
                                        closeModal()
                                    }
                                    else if (selected) {
                                        setForm({ ...form, tags: form.tags.filter((currentTag) => currentTag !== tag.$id) })
                                    }
                                    else if (form.tags.length < limit) {

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
                <Text className="text-sm font-rsthin color-mint mb-2">{card ? "Select a material" : "Select up to 3 tags"}</Text>
                <Pressable onPress={() => closeModal()}>
                    <MaterialCommunityIcons name={"close"} color={"#50bf88"} size={50} />
                </Pressable>
            </View>
        </Modal>
    )
}

export default TagSelectionModal
