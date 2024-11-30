import { View, Text, Pressable } from 'react-native'
import React from 'react'

const ListItem = ({ label, onPress, containerStyles, textStyles }) => {
    return (
        <Pressable onPress={() => onPress()} className={containerStyles}>
            <Text className={`${textStyles}`}>{label}</Text>
        </Pressable>
    )
}

export default ListItem
