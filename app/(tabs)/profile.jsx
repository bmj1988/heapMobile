import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'

const Profile = () => {
  const { user, page } = useGlobalContext()
  // const userData = useAppwrite(fetchReviewData(user.$id))
  return (
    <SafeAreaView>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image className="w-[60%] rounded-2xl" source={{ uri: user.avatar }} />
      </View>
      <View>
        <Text>{userData.listings.length}</Text>
        {/* <Text>{userData.ratingAverage} {`( ${userData.numRatings} )`}*/}
        {/* user can set area, or more than one area (max 2) for the day {user.area} */}
        <Text>{userData.blurb}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Profile
