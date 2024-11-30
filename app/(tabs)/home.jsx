import { RefreshControl, FlatList, Pressable, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAppwrite from '../../lib/useAppwrite'
import { getAllListings } from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import HighlightedListing from '../../components/HighlightedListing'
import ListingCard from '../../components/ListingCard'
import EmptyState from '../../components/EmptyState'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as Location from 'expo-location'


const Home = () => {
  const { user, page } = useGlobalContext()
  const { data: listings, refetch } = useAppwrite(() => getAllListings(user.$id))
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  // const { data: closestListings } = useAppwrite(() => getClosestListings(user.$id, user.location))
  const [refreshing, setRefreshing] = useState(false)
  const [selectedListing, setSelectedListing] = useState(null)

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Without location permissions enabled, you will not be able to see results close to you.');
        return
      }
      let location = await Location.getCurrentPositionAsync({});
      // location object structure: "{"coords": {"latitude", "longitude"} }
      setLocation(location)
    }
    getCurrentLocation()
  }, [])

  let text = 'Waiting...'
  if (errorMsg) {
    text = "Location Permission denied"
  } else if (location) {
    text = `LAT: ${location.coords.latitude}${typeof location.coords.latitude}, LONG: ${location.coords.longitude}`
  }

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
            buttonText={"Post a listing"}
            onPress={() => router.push('/listings')}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <Text className="text-mint text-xl">{text}</Text>
    </SafeAreaView>
  )
}

export default Home
