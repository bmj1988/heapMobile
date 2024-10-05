import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserListings } from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import useAppwrite from '../../lib/useAppwrite'
import ListingCard from '../../components/ListingCard'


const Listings = () => {
  const { user, page } = useGlobalContext()
  const [selectedListing, setSelectedListing] = useState(null)

  const { data: userListings, refetch } = useAppwrite(() => getUserListings(user.$id))

  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
        <FlatList
          className="h-[250px] w-full m-5"
          contentContainerStyle={{ justifyContent: 'center' }}
          data={userListings}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Pressable onPress={() => setSelectedListing(item)}>
              <ListingCard listing={item} selected={selectedListing && selectedListing.id === item.id ? true : false} />
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
      </View>
      {/*
      <Your posted listings>
      <Listings you bid on> */}
    </SafeAreaView>
  )
}

export default Listings
