import { View, Modal, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { revokeBid } from '../../lib/lambdas/bids'
const ClosedListingModal = ({ listing, acceptedBid, isVisible, setVisible }) => {
    const router = useRouter()

    const handleRevokeBid = async () => {
        // Add logic to revoke the bid
        await revokeBid(acceptedBid.$id)
        setVisible(false)
    }

    const handleMessage = () => {
        // Navigate to messaging screen with the bidder
        router.push(`/messages/${listing.acceptedBidder}`)
        setVisible(false)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setVisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-5 rounded-lg w-80">
                    <Text className="text-xl font-bold mb-4">Listing Actions</Text>

                    <Pressable
                        onPress={handleMessage}
                        className="bg-blue-500 p-3 rounded-lg mb-3"
                    >
                        <Text className="text-white text-center">Message Bidder</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleRevokeBid}
                        className="bg-red-500 p-3 rounded-lg mb-3"
                    >
                        <Text className="text-white text-center">Revoke Accepted Bid</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setVisible(false)}
                        className="bg-gray-300 p-3 rounded-lg"
                    >
                        <Text className="text-center">Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default ClosedListingModal
