import { FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'


const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.1
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}


const ListingImage = ({ activeItem, item }) => {

    return (
        <Animatable.Image
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
            source={{ uri: item.url }} />
    )
}

const ListingImagesCarousel = ({ images }) => {

    const [activeItem, setActiveItem] = useState(images[0])

    const viewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }


    return (
        <FlatList
            data={images}
            keyExtractor={(item) => (item.$id)}
            renderItem={({ item }) => (
                <ListingImage item={item} activeItem={activeItem} />
            )}
            horizontal
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{ x: 170 }}
        />
    )
}

export default ListingImagesCarousel
