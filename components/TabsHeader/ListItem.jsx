import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const ListItem = ({ label, onPress, containerStyles, textStyles }) => {
    return (
        <TouchableOpacity onPress={() => onPress()} className={containerStyles}>
            <Text className={`${textStyles}`}>{label}</Text>
        </TouchableOpacity>
    )
}

export default ListItem
