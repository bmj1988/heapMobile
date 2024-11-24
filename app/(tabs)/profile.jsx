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
      <View style={{justifyContent: "space-between"}}>
        <View>
          <Text>{userData.listings.length}</Text>
          <Text>Location: </Text>
        </View>
        <View>
          <Text>{`Average Rating ${averageRating}`} </Text>
          <Text>{`Num reviews ${totalReviews}`}</Text>
        </View>
      </View>
      <View className="display-flex justify-center items-center">
        <Text>{userData.blurb}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Profile
