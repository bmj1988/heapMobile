import { FlatList, Image, View } from 'react-native'
import React, { useState } from 'react'
// import * as Animatable from 'react-native-animatable'


// const zoomIn = {
//     0: {
//         scale: 0.9
//     },
//     1: {
//         scale: 1.1
//     }
// }

// const zoomOut = {
//     0: {
//         scale: 1
//     },
//     1: {
//         scale: 0.9
//     }
// }

const ListingImagesCarousel = ({ images }) => {

    // const viewableItemsChanged = ({ viewableItems }) => {
    //     if (viewableItems.length > 0) {
    //         setActiveItem(viewableItems[0].key)
    //     }
    // }
    console.log(images)

    return (
        <FlatList
            data={images}
            keyExtractor={(item) => (item.$id)}
            renderItem={({ item }) => (
                <Image
                    source={{ uri: item.url }}
                    style={{height: 150, width: 150}}
                    resizeMode='contain' />
            )}
            horizontal
            // onViewableItemsChanged={viewableItemsChanged}
            // viewabilityConfig={{
            //     itemVisiblePercentThreshold: 70
            // }}
        />
    )
}

export default ListingImagesCarousel
