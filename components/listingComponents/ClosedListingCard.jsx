import { View, Pressable, Text, Image } from 'react-native'
import DeleteListingButton from "./DeleteListingButton"
import { useState } from 'react'
import { deleteListing } from '../../lib/appwrite'
import ClosedListingModal from '../Modals/ClosedListingModal'

const ClosedListingCard = ({ listing, ownListings, setSelectedListing, selectedListing, setListings }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const askingPrice = parseInt(listing.askingPrice) > 0 ? parseInt(listing.askingPrice) : "Best\nOffer"
    const acceptedBid = listing.bids.find(bid => bid.accepted === true)

    const confirmDeleteListing = () => {
        deleteListing(listing)
        setSelectedListing(null)
        setListings(ownListings.filter((listing) => listing.$id !== listing.$id))
    }

    return (
        <>
            <Pressable
                onPress={() => setSelectedListing(listing.$id)}
                onLongPress={() => setModalVisible(true)}
                className="m-1"
            >
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View className={`${selectedListing === listing.$id ? "border-[1px] border-mint border-solid" : ""} h-fit w-[90%] bg-black-200 rounded-2xl p-1 flex-row items-center justify-between`}>
                        <View className="items-center justify-center w-[25%]">
                            <Text className="color-gray-100 text-rsthin">Asked</Text>
                            <Text className={`font-rsbold color-mint ${typeof askingPrice === "string" ? "text-md" : "text-2xl"}`}>
                                {typeof askingPrice === "string" ? askingPrice : `$${askingPrice}`}
                            </Text>
                        </View>

                        <View className="items-center justify-center w-[25%]">
                            <Text className="color-gray-100 text-rsthin">Bid</Text>
                            <Text className="text-2xl font-rsbold color-mint">
                                ${acceptedBid?.offer || 0}
                            </Text>
                        </View>

                        <View className="w-[25%] h-[90%]">
                            {listing.images.map((image) => {
                                const i = listing.images.indexOf(image)
                                return (
                                    <Image
                                        source={image.url ? { uri: image.url } : {uri: image.uri}}
                                        style={{
                                            width: 60,
                                            height: 60,
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

                        <View className="items-center justify-center w-[25%]">
                            <Text className="color-gray-100 text-rsthin">Status</Text>
                            <Text className="text-md font-rsbold color-mint">Closed</Text>
                        </View>
                    </View>

                    {selectedListing === listing.$id && (
                        <DeleteListingButton
                            listing={listing.$id}
                            valid={true}
                            deleteListing={confirmDeleteListing}
                        />
                    )}
                </View>
            </Pressable>
            <ClosedListingModal
                listing={listing}
                isVisible={modalVisible}
                setVisible={setModalVisible}
            />
        </>
    )
}

export default ClosedListingCard
