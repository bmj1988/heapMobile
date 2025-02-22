import { FlatList, Pressable, Text } from "react-native"
import ListingCard from "../../../components/ListingCard"

// will have to build validator for closing listings before confirmed bids are expired

const AcceptedBids = ({ bids, setSelected, selected }) => {

    return (
        <FlatList
            style={{ marginLeft: 15, marginTop: 10, width: "90%" }}
            contentContainerStyle={{ justifyContent: 'center' }}
            data={bids}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <Pressable onLongPress={() => setSelected(item.listing.$id)}>
                    <ListingCard listing={item.listing} selected={selected.$id === item.listing.$id} bid={item} />
                </Pressable>)}
            ListEmptyComponent={() => (
                <Text className="text-center text-gray-500 font-rsregular text-sm">You currently have no accepted bids awaiting pickup.</Text>
            )}
        />
    )
}

export default AcceptedBids
