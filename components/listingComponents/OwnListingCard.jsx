import { View, Pressable } from 'react-native'
import ListingCard from "@/components/ListingCard"
import EditListingDetailsModal from '../Modals/EditListingDetailsModal'
import { useState } from 'react'
import OwnListingDetailsModal from '../Modals/OwnListingDetailsModal'

const OwnListingCard = ({ listing, setSelectedListing, selectedListing }) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [bidsModalVisible, setBidsModalVisible] = useState(false)

    return (
        <>
            <Pressable onPress={() => {
                setSelectedListing(listing.$id)
                setBidsModalVisible(true)}} onLongPress={() => setModalVisible(true)} className="m-1">
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <ListingCard listing={listing} selected={selectedListing && selectedListing === listing.$id} ownListing={true} />
                </View>
            </Pressable>
            <OwnListingDetailsModal listing={listing} isVisible={bidsModalVisible} setVisible={setBidsModalVisible} setEditModalVisible={setModalVisible} />
            <EditListingDetailsModal listing={listing} setVisible={setModalVisible} isVisible={modalVisible} />
        </>
    )
}

export default OwnListingCard
