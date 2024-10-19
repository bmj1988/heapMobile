import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'


const CaretCollapsible = ({ text, DropdownComponent }) => {
    const [pressed, setPressed] = useState(false)
    const styles = {
        pressed: "rounded-3xl border-gray-100 border-solid border-[1px] bg-mint p-1 pr-3 pl-3 justify-between items-center m-1 min-w-[50px] max-w-auto flex-row",
        unpressed: "rounded-3xl border-gray-100 border-solid border-[1px] bg-black-100 p-1 pr-3 pl-3 justify-between items-center m-1 min-w-[50px] max-w-auto flex-row",
        textPressed: "color-black-100",
        textUnpressed: "color-mint",
        iconPressed: "caret-up",
        iconUnpressed: "caret-down",
        iconColorP: "#1E1E2D",
        iconColorU: "#50bf88",
    }

    return (
        <>
            <Pressable onPress={() => setPressed(!pressed)}>
                <View className={pressed ? styles.pressed : styles.unpressed}>
                    <Text className={`font-rssemibold text-xl ${pressed ? styles.textPressed : styles.textUnpressed}`}>{text}</Text>
                    <FontAwesome name={pressed ? styles.iconPressed : styles.iconUnpressed} color={pressed ? styles.iconColorP : styles.iconColorU} size={25} />
                </View>
            </Pressable>
            {pressed && DropdownComponent}
        </>
    )
}

export default CaretCollapsible
