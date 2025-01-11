import { FlatList, Image, Pressable, Text, View } from 'react-native'
import EmptyState from '../EmptyState'
import TextPressable from '../TextPressable'
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

const ListingImagesCarousel = ({ images, own, setImages, imagePicker, setDeletedImages, deletedImages }) => {

    const deleteImage = (item) => {
        if (item.url) setDeletedImages([...deletedImages, item.$id])
        const uri = item.url ? item.url : item.uri
        setImages(images.filter((image) => (uri !== image.url && uri !== image.uri)))
    }


    // const viewableItemsChanged = ({ viewableItems }) => {
    //     if (viewableItems.length > 0) {
    //         setActiveItem(viewableItems[0].key)
    //     }
    // }

    console.log(">>>> ListingImagesCarousel >>>", images)

    return (
        <FlatList
            data={images}
            keyExtractor={(item) => (item.$id)}
            renderItem={({ item }) => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={item.url ? { uri: item.url } : { uri: item.uri }}
                        style={{ height: 150, width: 100 }}
                        resizeMode='contain' />
                    {own ? (
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
                <EmptyState icon={"image"}
                    title={"No image provided"}
                    subtitle={null}
                    onPress={own ? () => imagePicker() : null}
                    button={false} />
            }
        // onViewableItemsChanged={viewableItemsChanged}
        // viewabilityConfig={{
        //     itemVisiblePercentThreshold: 70
        // }}
        />
    )
}

export default ListingImagesCarousel
