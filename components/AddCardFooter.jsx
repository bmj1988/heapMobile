import { View, Text, TextInput, Pressable, Modal, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TagSelectionModal from './Modals/TagSelectionModal'
import { useGlobalContext } from '@/context/GlobalProvider'
import { createNewCard, getAllTags } from '../lib/appwrite'
import useAppwrite from '../lib/useAppwrite'
import { FontAwesome } from '@expo/vector-icons'
import CustomButton from './CustomButton'

const AddCardFooter = ({ setPrices, prices, edit = false, formOpen = false }) => {
    const { user } = useGlobalContext()
    const materialRef = useRef(null);
    /// load into redis soon
    const { data: tags } = useAppwrite(() => getAllTags())
    const [tagModalVisible, setTagModalVisible] = useState(false)
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [formDisplay, setFormDisplay] = useState(formOpen)
    const [isLoading, setIsLoading] = useState(false)
    const defaultFormState = {
        user: user.$id,
        material: "Material",
        price: 0.00,
        tags: null,
        type: "lb",
        minimum: null
    }
    const [form, setForm] = useState(edit ? edit : defaultFormState)
    const units = ['lb', 'kg', 'piece']

    console.log('PRICES', prices)

    const submit = async () => {
        setIsLoading(true)
        try {
            if (edit) {
                // going to change from this appwrite logic to a function
                // that UPSERTS so this should not be an issue
                // let update = await updateCard(form)
                // let otherPrices = prices.filter((card) => card.$id !== form.$id)
                // setPrices([...otherPrices, update])
                // setFormDisplay(false)
                // setForm(defaultFormState)
            }
            let newCard = await createNewCard(form)
            if (!newCard) throw new Error("Could not create new card")
            setPrices([...prices, newCard])
            setFormDisplay(false)
            setForm(defaultFormState)
        }
        catch (e) {
            console.error(e)
            throw new Error(e)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <View
            className={`bg-primary w-full border-mint border-[1px]`}
            style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                width: '100%',
                borderBottomWidth: 0
            }}>
            <Pressable
                style={{
                    dipslay: 'flex',
                    flexDirection: 'row',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 50,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 0
                }}
                onPress={() => setFormDisplay(!formDisplay)}>
                <Text className={`font-rsbold color-mint text-xl mr-5`}>Add Price Card</Text>
                <FontAwesome name={"plus"} color={"#50bf88"} size={22} />
            </Pressable>
            {formDisplay &&
                <View className={`h-fit w-[full] bg-primary p-1 flex-row items-center justify-between pr-3 pl-3`}>
                    <View className={`items-center justify-start w-[35%]`}>
                        <Text className="color-gray-100 text-rsthin">{"Material"}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Pressable
                                onPress={() => edit ? null : setTagModalVisible(true)}
                                className="justify-start items-center">
                                <FontAwesome name={"tag"} color={"#50bf88"} size={25} />
                                <Text className="color-gray-100 text-rsthin">Add a tag</Text>
                            </Pressable>
                            {edit &&
                                <Text>
                                    {edit.material}
                                </Text>}
                            {!edit && <TextInput
                                className="bg-black-200 color-mint text-rsregular w-[80px] h-[33px] p-1 rounded-md m-1"
                                onChangeText={(text) => setForm({ ...form, material: text })}
                                value={form.material}
                            // autoFocus={true}
                            />}
                        </View>
                    </View>
                    <View className="h-full items-center justify-start w-[10%]">
                        <Text className="color-gray-100 text-rsthin">{"Price"}</Text>
                        <TextInput
                            value={form.price}
                            className="bg-black-200 color-mint text-rsregular w-[50px] h-[33px] p-1 rounded-md m-1"
                            inputMode='decimal'
                            onChangeText={(text) => setForm({ ...form, price: parseFloat(text) })} />
                    </View>
                    <View className="items-center justify-center w-[20%]">
                        <Text className="color-gray-100 text-rsthin">{"per"}</Text>
                        <Pressable onPress={() => {
                            console.log('click')
                            setDropdownVisible(true)
                        }
                        }>
                            <Text className={`font-rsbold color-mint text-xl bg-black-200 p-1 rounded-md m-1`}>{form.type}</Text>
                        </Pressable>
                        {dropdownVisible &&
                            <View style={{ position: 'absolute', bottom: 1 }} className="p-1 rounded-md m-1 bg-black-200">
                                {units.map((unit) => (
                                    <Pressable key={unit} onPress={() => {
                                        setForm({ ...form, type: unit })
                                        setDropdownVisible(false)
                                    }}>
                                        <Text className={`font-rsbold color-mint text-xl bg-black-200 p-1`}>{unit}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        }
                    </View>
                    {/* <View className="items-center justify-center w-[25%]">
                        <Text className="color-gray-100 text-rsthin">{"Minimum\n(optional)"}</Text>
                        <TextInput
                            inputMode='numeric'
                            onChangeText={(text) => {
                                let min = parseInt(text)
                                if (min > 0) setForm({ ...form, minimum: min })
                            }} />
                    </View> */}
                    <CustomButton title={"ADD"} handlePress={() => submit()} isLoading={isLoading} containerStyles={'p-2 h-[fit-content]'} />
                    <TagSelectionModal visible={tagModalVisible} closeModal={() => setTagModalVisible(false)} form={form} setForm={setForm} tagList={tags} currentTags={form.tags} card={true} />

                </View>
            }
            {/* I envision a horizontal slider  */}
            {/* Checkbox for whether to set a minimum, and then an integer (numeric) input for the minimum */}
        </View>
    )
}

export default AddCardFooter
