import { FlatList, Image, Pressable, Text, View } from 'react-native'
import TextPressable from '../TextPressable'
import NoImageProvided from '../listingComponents/NoImageProvided'
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

const ListingImagesCarousel = ({ images, editingListing = false, setImages, imagePicker, setDeletedImages, deletedImages }) => {

    const deleteImage = (item) => {
        if (item.url) setDeletedImages([...deletedImages, item])
        console.log("$$$$$deletedImages", deletedImages)
        const uri = item.url ? item.url : item.uri
        setImages(images.filter((image) => (uri !== image.url && uri !== image.uri)))
    }


    // const viewableItemsChanged = ({ viewableItems }) => {
    //     if (viewableItems.length > 0) {
    //         setActiveItem(viewableItems[0].key)
    //     }
    // }

    return (
        <FlatList
            data={images}
            keyExtractor={(item) => (item.$id || item.uri)}
            renderItem={({ item }) => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }} key={item.$id || item.uri}>
                    <Pressable onPress={() => editingListing ? imagePicker() : null}>
                        <Image
                            source={item.url ? { uri: item.url } : { uri: item.uri }}
                            style={{ height: 150, width: 100 }}
                            resizeMode='contain' />
                    </Pressable>
                    {editingListing ? (
                        <TextPressable
                            onPress={() => deleteImage(item)}
                            textStyle={"text-sm font-rsthin color-carmine underline"}
                            text={"Delete image"} />
                    ) :
                        null}
                </View>
            )}
            horizontal
            ListEmptyComponent={
                <NoImageProvided onPress={editingListing ? imagePicker : null} />
            }
        // onViewableItemsChanged={viewableItemsChanged}
        // viewabilityConfig={{
        //     itemVisiblePercentThreshold: 70
        // }}
        />
    )
}

export default ListingImagesCarousel
