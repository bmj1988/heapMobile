import { View, Text, SafeAreaView, Image } from 'react-native'
import { getReviews } from '../lib/appwrite'
import useAppwrite from '../lib/useAppwrite'

const ProfileComponent = ({ user }) => {
    const result = useAppwrite(() => getReviews(user.$id))
    const [totalReviews, averageRating] = result.data

    return (
        <SafeAreaView className="bg-primary h-full">
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image className="rounded-full" style={{ height: 150, width: 150, margin: 20, borderWidth: 2, borderColor: "#50bf88" }} source={{ uri: user.avatar }} />
            </View>
            <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", margin: 20 }}>
                <View>
                    <Text className="color-mint font-rsregular">{`${user.listings.length} Sales`}</Text>
                    <Text className="color-mint font-rsregular">Location: </Text>
                </View>
                <View>
                    <Text className="color-mint font-rsregular">{`Joined ${new Date(user.$createdAt).toLocaleDateString()}`}</Text>
                    <Text className="color-mint font-rsregular">{`Average Rating ${averageRating}`} </Text>
            <Text className="color-mint font-rsregular">{`${totalReviews} ${totalReviews === 1 ? 'Review' : 'Reviews'}`}</Text>
                </View>
            </View>
            <View className="display-flex justify-center items-center m-5">
                <Text className="color-mint font-rsregular" >{user.blurb}</Text>
            </View>
        </SafeAreaView>
    )
}

export default ProfileComponent
