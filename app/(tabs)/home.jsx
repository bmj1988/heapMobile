import { RefreshControl, FlatList, Pressable, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAppwrite from '../../lib/useAppwrite'
import { getAllListings, updateLocation } from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import HighlightedListing from '../../components/HighlightedListing'
import ListingCard from '../../components/ListingCard'
import EmptyState from '../../components/EmptyState'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import CustomButton from '../../components/CustomButton'
import { useLocationContext } from '../../context/LocationProvider'
import { fetchFeed } from '../../lib/appwriteFunctions'


const Home = () => {
  const { user } = useGlobalContext()
  const { location } = useLocationContext()
  const [page, setPage] = useState(1)
  const [radius, setRadius] = useState(10)
  const { data: listings, refetch } = useAppwrite(() => fetchFeed(location.longitude, location.latitude, user.$id, radius, page))
  const [refreshing, setRefreshing] = useState(false)
  const [selectedListing, setSelectedListing] = useState(null)

  console.log("LISTINGS", listings)

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
        className={"h-full w-full mr-5 ml-5 mb-5"}
        contentContainerStyle={{ justifyContent: 'center' }}
        data={listings}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Pressable onPress={() => setSelectedListing(item)}>
            <ListingCard listing={item} selected={selectedListing && selectedListing.id === item.id ? true : false} />
          </Pressable>
        )}
        ListHeaderComponent={() => (
          <HighlightedListing listing={selectedListing} onClose={() => setSelectedListing(null)} />
        )}


        ListEmptyComponent={() => (
          <EmptyState
            title={"No listings found."}
            subtitle={"Be the first to post a listing today!"}
            buttonText={"Post a listing"}
            onPress={() => router.push('/listings')}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      {/* CUSTOM BUTTON TO TRY OUT FUNCTION ENDPOINTS
      <CustomButton title={"Test Function"} handlePress={() => fetch(`https://674e6d0d6a579a4b6cf3.appwrite.global/feed?page=${page}`, {
        method: "GET",
        headers: { "x-user-id": `${user.$id}`, "x-longitude": `${user.longitude}`, "x-latitude": `${user.latitude}` }
      }).then((results) => results.json()).then((results) => console.log(results))} /> */}

    </SafeAreaView>
  )
}


//`https://674e6d0d6a579a4b6cf3.appwrite.global/current?userId=${user.$id}`
export default Home
