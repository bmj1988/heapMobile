import { View, Text, TextInput, Pressable, Modal, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TagSelectionModal from './Modals/TagSelectionModal'
import { useGlobalContext } from '@/context/GlobalProvider'
import { createNewCard, deleteCard, getAllTags, updateCard } from '../lib/appwrite'
import useAppwrite from '../lib/useAppwrite'
import { FontAwesome } from '@expo/vector-icons'
import CustomButton from './CustomButton'

const AddCardFooter = ({ setPrices, prices, edit = null, formOpen = false, setCard = null, setFormOpen = null }) => {
    const { user } = useGlobalContext()
    /// load into redis soon
    const { data: tags } = useAppwrite(() => getAllTags())
    const [tagModalVisible, setTagModalVisible] = useState(false)
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [formDisplay, setFormDisplay] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const defaultFormState = {
        user: user.$id,
        material: "",
        price: 0.00,
        tags: null,
        type: "lb",
        minimum: null
    }
    const [form, setForm] = useState(defaultFormState)
    const units = ['lb', 'kg', 'piece']

    useEffect(() => {
        if (formOpen) {
            console.log('EDIT OBJ', edit)
            setForm({
                $id: edit.$id,
                user: edit.user.$id,
                material: edit.material,
                price: edit.price,
                type: edit.type,
                minimum: edit.minimum
            })
            setFormDisplay(true)
            console.log(form)
        }
    }, [formOpen, edit])

    console.log('FORM', form)

    const wipeForm = (newPrices) => {
        setPrices(newPrices)
        setFormDisplay(false)
        setForm(defaultFormState)
        setCard(null)
        return
    }

    const submitEdit = async () => {
        setIsLoading(true)
        try {
            let update = await updateCard(form)
            let otherPrices = prices.filter((card) => card.$id !== form.$id)
            wipeForm([...otherPrices, update])
            console.log("Submit Edit - Success")
        }
        catch (e) {
            console.error(e)
            throw new Error(e)
        }
        finally {
            setIsLoading(false)
        }
    }

    const submitCreate = async () => {
        setIsLoading(true)
        try {
            let newCard = await createNewCard(form)
            if (!newCard.$id) throw new Error("Could not create new card")
            wipeForm([...prices, newCard])
        }
        catch (e) {
            console.error(e)
            throw new Error(e)
        }
        finally {
            setIsLoading(false)
        }
    }

    const submitDelete = async () => {
        setIsLoading(true)
        try {
            await deleteCard(edit.$id)
            const otherPrices = prices.filter((price) => price.$id !== edit.$id)
            wipeForm(otherPrices)

        }
        catch (e) {
            console.error(e)
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
                onPress={() => {
                    if (edit) {
                        setCard(null)
                    }
                    setForm(defaultFormState)
                    setFormOpen(false)
                    setFormDisplay(!formDisplay)
                }}>
                <Text className={`font-rsbold color-mint text-xl mr-5`}>{`${edit ? "Edit" : "Add"} Price Card`}</Text>
                <FontAwesome name={"plus"} color={"#50bf88"} size={22} />
            </Pressable>
            {formDisplay &&
                <View>
                    <View className={`h-fit w-[full] bg-primary p-1 flex-row items-center justify-between pr-3 pl-3`}>
                        <View className={`items-center justify-start w-[35%]`}>
                            <Text className="color-gray-100 text-rsthin">{"Material"}</Text>
                            {edit &&
                                <Text className="text-xl color-mint font-rsbold">
                                    {edit.material}
                                </Text>}
                            {!edit &&
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Pressable
                                        onPress={() => edit ? null : setTagModalVisible(true)}
                                        className="justify-start items-center">
                                        <FontAwesome name={"tag"} color={"#50bf88"} size={25} />
                                        <Text className="color-gray-100 text-rsthin">Add a tag</Text>
                                    </Pressable>
                                    <TextInput
                                        className="bg-black-200 color-mint text-rsregular w-[80px] h-[33px] p-1 rounded-md m-1"
                                        onChangeText={(text) => setForm({ ...form, material: text })}
                                        value={form.material}
                                        placeholder='Material?'
                                        placeholderTextColor={"#CDCDE0"}
                                        autoFocus={true}
                                    />
                                </View>}

                        </View>
                        <View className="h-full items-center justify-start w-[10%]">
                            <Text className="color-gray-100 text-rsthin">{"Price"}</Text>
                            <TextInput
                                value={parseFloat(form.price).toFixed(2)}
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
                                            <Text className={`font-rsbold color-mint text-xl bg-black-200 p-1`}>{form.type}</Text>
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
                        <CustomButton title={`${edit ? "EDIT" : "ADD"}`} handlePress={edit ? () => submitEdit() : () => submitCreate()} isLoading={isLoading} containerStyles={'p-2 h-[fit-content]'} />
                        <TagSelectionModal visible={tagModalVisible} closeModal={() => setTagModalVisible(false)} form={form} setForm={setForm} tagList={tags} currentTags={form.tags} card={true} />
                    </View>
                    {
                        edit &&
                        <CustomButton title="Delete Price Card" handlePress={() => submitDelete()} containerStyles={"bg-carmine m-2"} isLoading={isLoading} />
                    }

                </View>
            }
            {/* I envision a horizontal slider  */}
            {/* Checkbox for whether to set a minimum, and then an integer (numeric) input for the minimum */}
        </View>
    )
}

export default AddCardFooter
