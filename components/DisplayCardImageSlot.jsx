import { View, Image } from 'react-native'
import React from 'react'

const DisplayCardImageSlot = ({ images, imageSize = 60 }) => {
    const numberOfImages = images.length;
    return (
        <View className="w-full h-full items-center justify-center" style={{ marginLeft: numberOfImages > 2 ? 40 : 0 }}>
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
                                borderWidth: 1,
                            }}
                            className="rounded-md"
                            key={image.$id || image.uri || `image-${i}`}
                        />
                    )
                })}
            </View>
        </View>
    )
}

export default DisplayCardImageSlot
