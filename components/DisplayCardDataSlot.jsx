import { View, Text } from 'react-native'
import React from 'react'

const DisplayCardDataSlot = ({ header, data, dataSize = "2xl", headerColor = "gray-100", dataColor = "mint", width = "25%" }) => {
    return (
        <>
            <Text className={`color-${headerColor} text-rsthin`} numberOfLines={1}>
                {header}
            </Text>
            <Text
                className={`text-${dataSize} font-rsbold color-${dataColor} mt-1`}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {data}
            </Text>
        </>
    )
}

export default DisplayCardDataSlot
