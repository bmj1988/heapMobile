import { View, Text, RefreshControl, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import useAppwrite from '../../lib/useAppwrite'
import { getAllListings } from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import HighlightedListing from '../../components/HighlightedListing'
import ListingCard from '../../components/ListingCard'
import EmptyState from '../../components/EmptyState'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const { user, page } = useGlobalContext()
  const { data: listings, refetch } = useAppwrite(() => getAllListings(user.$id))
  // IN ACTUAL PRACTICE ALL LISTINGS WOULD BE RETRIEVED BY LOCATION, HIGHLIGHTED LISTINGS WOULD JUST BE FED THE TOP 3
  // const { data: closestListings } = useAppwrite(() => getClosestListings(user.$id, user.location))
  const [refreshing, setRefreshing] = useState(false)
  const [selectedListing, setSelectedListing] = useState(null)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }
  /// IDEA: List of listings, fetches next page when scrolled to the end of paginated results
  /// Header component: more info, bigger bidding interface on highlighted result
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        className={"h-full w-full m-5"}
        contentContainerStyle={{ justifyContent: 'center' }}
        data={listings}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Pressable onPress={() => setSelectedListing(item)}>
            <ListingCard listing={item} selected={selectedListing && selectedListing.id === item.id ? true : false} />
          </Pressable>
        )}
        ListHeaderComponent={() => (
          <HighlightedListing listing={selectedListing} />
        )}
        // ListHeaderComponent={() => (
        //   <View className="my-6 px-4 space-y-6">
        //     <View className="w-full flex-1 pt-5">
        //       <Text className="text-gray-100 text-lg font-pregular mb-3">Closest listings</Text>
        //       <HighlightedListings />
        //     </View>
        //   </View>
        // )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No listings found."}
            subtitle={"Be the first to post a listing today!"}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home
