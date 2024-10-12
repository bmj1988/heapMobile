import { FlatList, Pressable } from "react-native"
import ListingCard from "@/components/ListingCard"
import CustomButton from '@/components/CustomButton'

const BidDisplay = ({ bid }) => {
    return (
        <View className="h-[40px] w-[50%] bg-black-200 rounded-2xl p-2 flex-row items-center justify-around">
            <View className="m-2 items-center justify-center">
                <Text className="color-gray-100 text-rsthin">Offer</Text>
                <Text className="text-2xl font-rsbold color-mint">{bid.offer}</Text>
            </View>
            <View className="m-2 items-center justify-center">
                <Text className="color-gray-100 text-rsthin">User</Text>
                <Text className="text-2xl font-rsbold color-mint">{bid.buyerId.username}</Text>
            </View>
            <View className="m-2 items-center justify-center">
                <CustomButton title={"Accept Bid"} handlePress={() => console.log("Click accept bid")} />
            </View>
        </View>
    )
}

const OwnListings = ({ userListings, selectedListing, setSelectedListing }) => {

    return (
        <FlatList
            className="h-[250px] w-full m-5"
            contentContainerStyle={{ justifyContent: 'center' }}
            data={userListings}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <Pressable onPress={() => setSelectedListing(item.$id)}>
                    <ListingCard listing={item} selected={selectedListing && selectedListing === item.$id ? true : false} />
                    {selectedListing === item.$id &&
                        item.bids.map((bid) => <BidDisplay bid={bid} />)
                    }
                </Pressable>
            )}
            // ListHeaderComponent={() => (
            //   <PostListingHeader />
            // )}
            ListEmptyComponent={() => (
                <EmptyState
                    title={"No listings found."}
                    subtitle={"Post a listing now!"}
                    buttonText={"Post a listing"}
                    onPress={() => console.log("Click pst new listing")} />
            )}
        />
    )
}

export default OwnListings
