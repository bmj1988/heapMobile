import { View, Text, TextInput, Pressable, Modal, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TagSelectionModal from './Modals/TagSelectionModal'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getAllTags } from '../lib/appwrite'
import useAppwrite from '../lib/useAppwrite'
import { FontAwesome } from '@expo/vector-icons'

const AddCardFooter = () => {
    const { user } = useGlobalContext()
    const materialRef = useRef(null);
    /// load into redis soon
    const { data: tags } = useAppwrite(() => getAllTags())
    const [tagModalVisible, setTagModalVisible] = useState(false)
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [formDisplay, setFormDisplay] = useState(false)
    const [form, setForm] = useState({
        user: user.$id,
        material: "Material",
        price: 0.00,
        tags: null,
        type: "lb",
        minimum: null
    })
    const units = ['lbs', 'kg', 'piece']

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.value = form.material;
        }
    }, [form.material])
    const submit = () => {
        // databases.upsertDocument(form)
        // setLoading true
        // clear state
        // refresh cards
        // setLoading false
    }
    return (
        <View>
            <Pressable
                style={{
                    dipslay: 'flex',
                    flexDirection: 'row',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 40,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                className={`bg-black-200 w-full`}
                onPress={() => setFormDisplay(!formDisplay)}>
                <Text className={`font-rsbold color-mint text-xl mr-5`}>Add Price Card</Text>
                <FontAwesome name={"plus"} color={"#50bf88"} size={22} />
            </Pressable>
            {formDisplay &&
                <View className={`h-fit w-[full] bg-black-200 p-1 flex-row items-center justify-between`}>
                    <View className={`items-center justify-start w-[35%]`}>
                        <Text className="color-gray-100 text-rsthin">{"Material"}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Pressable
                                onPress={() => setTagModalVisible(true)}
                                className="justify-start items-center">
                                <FontAwesome name={"tag"} color={"#50bf88"} size={25} />
                                <Text className="color-gray-100 text-rsthin">Add a tag</Text>
                            </Pressable>
                            <TextInput
                                className="bg-black color-mint text-rsregular w-[80px] h-[33px]"
                                onChangeText={(text) => setForm({ ...form, material: text })}
                                ref={materialRef}
                                autoFocus={true}
                            />
                        </View>
                    </View>
                    <View className="h-full items-center justify-start w-[10%]">
                        <Text className="color-gray-100 text-rsthin">{"Price"}</Text>
                        <TextInput
                            value={form.price}
                            className="bg-black color-mint text-rsregular w-[50px] h-[33px]"
                            inputMode='decimal'
                            onChangeText={(text) => setForm({ ...form, type: parseFloat(text) })} />
                    </View>
                    <View className="items-center justify-center w-[10%]">
                        <Pressable onPress={() => setDropdownVisible(true)}>
                            <Text className={`font-rsbold color-mint text-xl bg-black p-1`}>{form.type}</Text>
                        </Pressable>
                        {dropdownVisible && (
                            <Modal transparent animationType='fade'>
                                <Pressable onPress={setDropdownVisible} />
                                <View>
                                    <FlatList
                                        data={units}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => {
                                            <Pressable onPress={() => setForm({ ...form, type: item })}>
                                                <Text>{`per ${item}`}</Text>
                                            </Pressable>
                                        }} />
                                </View>
                            </Modal>
                        )}
                    </View>
                    <View className="items-center justify-center w-[25%]">
                        <Text className="color-gray-100 text-rsthin">{"Minimum\n(optional)"}</Text>
                        <TextInput
                            inputMode='numeric'
                            onChangeText={(text) => {
                                let min = parseInt(text)
                                if (min > 0) setForm({ ...form, minimum: min })
                            }} />
                    </View>
                    <TagSelectionModal visible={tagModalVisible} closeModal={() => setTagModalVisible(false)} form={form} setForm={setForm} tagList={tags} currentTags={form.tags} card={true} />

                </View>
            }
            {/* I envision a horizontal slider  */}
            {/* Checkbox for whether to set a minimum, and then an integer (numeric) input for the minimum */}
        </View>
    )
}

export default AddCardFooter
