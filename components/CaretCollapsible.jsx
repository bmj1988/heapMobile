import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'


const CaretCollapsible = ({ text, DropdownComponent }) => {
    const [pressed, setPressed] = useState(false)
    const styles = {
        pressed: "rounded-3xl border-gray-100 border-solid border-[1px] bg-mint justify-center items-center m-1",
        unpressed: "rounded-3xl border-gray-100 border-solid border-[1px] bg-black-100 justify-center items-center m-1",
        textPressed: "color-black-100",
        textUnpressed: "color-mint",
        iconPressed: "caret-up",
        iconUnpressed: "caret-down",
        iconColorP: "#1E1E2D",
        iconColorU: "#50bf88",
    }

    return (
        <>
            <Pressable className={pressed ? styles.pressed : styles.unpressed} onPress={() => setPressed(!pressed)}>
                <View className="flex-row">
                    <Text className="font-rssemibold text-lg">{text}</Text>
                    <FontAwesome name={pressed ? styles.iconPressed : styles.iconUnpressed} color={pressed ? styles.iconColorP : styles.iconColorU} size={15} />
                </View>
            </Pressable>
            {pressed && DropdownComponent}
        </>
    )
}

export default CaretCollapsible
