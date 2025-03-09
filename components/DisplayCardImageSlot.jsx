import { View, Image } from 'react-native'
import React from 'react'

const DisplayCardImageSlot = ({ images, imageSize = 60 }) => {
    return (
        <View className="w-full h-full items-center justify-center">
            <View className="relative" style={{ width: imageSize, height: imageSize }}>
                {images.map((image, i) => {
                    return (
                        <Image
                            source={image.url ? { uri: image.url } : { uri: image.uri }}
                            style={{
                                width: imageSize,
                                height: imageSize,
                                elevation: 5 - i,
                                right: i * 10,
                                position: 'absolute',
                                borderColor: "#232533",
                                borderRadius: 8,
                                borderWidth: 1
                            }}
                            className="rounded-md"
                            key={image.$id ? image.$id : image.uri}
                        />
                    )
                })}
            </View>
        </View>
    )
}

export default DisplayCardImageSlot
