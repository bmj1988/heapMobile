import { RefreshControl, FlatList, Pressable, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'
import HighlightedListing from '../../components/HighlightedListing'
import ListingCard from '../../components/ListingCard'
import EmptyState from '../../components/EmptyState'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useLocationContext } from '../../context/LocationProvider'
import { fetchFeedListings, feedListingsArray } from '../../store/feed'
import { useDispatch, useSelector } from 'react-redux'
import FeedListEmptyComponent from '../../components/ListEmptyComponents/FeedListEmpty'

const Home = () => {
  const dispatch = useDispatch()
  const { user } = useGlobalContext()
  const { location } = useLocationContext()
  const [page, setPage] = useState(1)
  const [radius, setRadius] = useState(10)
  const listings = useSelector(feedListingsArray)
  const status = useSelector(state => state.feed.status)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedListing, setSelectedListing] = useState(null)

  const onRefresh = async () => {
    setRefreshing(true)
    await dispatch(fetchFeedListings({
      long: location.longitude,
      lat: location.latitude,
      userId: user.$id,
      radius,
      page
    }));
    setRefreshing(false)
  }

  useEffect(() => {
    if (location) {
      dispatch(fetchFeedListings({
        long: location.longitude,
        lat: location.latitude,
        userId: user.$id,
        radius,
        page
      }))
    }
  }, [location])
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
          <Pressable onPress={() => {
            setSelectedListing(item)
          }} className="m-1">
            <ListingCard listing={item} selected={selectedListing && selectedListing.$id === item.$id ? true : false} />
          </Pressable>
        )}
        ListHeaderComponent={() => (
          <HighlightedListing listing={selectedListing} onClose={() => setSelectedListing(null)} />
        )}


        ListEmptyComponent={() => (
          <FeedListEmptyComponent status={status} onRefresh={onRefresh} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}


//`https://674e6d0d6a579a4b6cf3.appwrite.global/current?userId=${user.$id}`
export default Home
