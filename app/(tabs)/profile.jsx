import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { getReviews } from '../../lib/appwrite'

const Profile = () => {
  const { user, page } = useGlobalContext()
  const [totalReviews, averageRating] = useAppwrite(() => getReviews(user.$id))
  return (
    <SafeAreaView>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image className="w-[60%] rounded-2xl" source={{ uri: user.avatar }} />
      </View>
      <View>
        <Text>{userData.listings.length}</Text>
        <Text>{`Average Rating ${averageRating}`} </Text>
        <Text>{`Num reviews ${totalReviews}`}</Text>
        <Text>Location: </Text>
        <Text>{userData.blurb}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Profile
