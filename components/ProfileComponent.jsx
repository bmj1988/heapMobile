import { View, Text, SafeAreaView, FlatList, Pressable, Image } from 'react-native'
import { getCards, getReviews } from '../lib/appwrite'
import useAppwrite from '../lib/useAppwrite'
import EmptyState from './EmptyState'
import PriceCard from './PriceCard'
import AddCardFooter from './AddCardFooter'
import { useEffect, useState } from 'react'

const ProfileComponent = ({ user, own }) => {
    // THIS WILL RUN A SINGLE CALL IN THE FUTURE
    const result = useAppwrite(() => getReviews(user.$id))
    const { data: cards, refetch } = useAppwrite(() => getCards(user.$id))
    const [totalReviews, averageRating] = result.data
    const [prices, setPrices] = useState(cards)

    useEffect(() => {
        setPrices(cards)
    }, [cards])

    const ListEmptyComponent = () => {
        if (own) {

            return (
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ textAlign: 'center', width: "90%" }} className="color-mint font-rsregular">
                        {"You currently have no prices listed on your profile. This is how buyers advertise their prices to sellers viewing their profile. If you are here to sell, don't worry -- we won't show this section on your profile. If you are here to buy and want to post a price, click the Add button below to get started."}
                    </Text>
                </View>
            )
        }
        else {
            return (
                <View>
                    <Text className="color-mint font-rsregular">
                        {"This user has no prices listed on their profile."}
                    </Text>
                </View>
            )
        }
    }

    const ProfileFooter = () => {
        if (own) {
            return (
                <AddCardFooter setPrices={setPrices} prices={prices} />
            )
        }
        else {
            return (
                <View>
                    <Text>
                        Contact bar component,
                        send message,
                        browse prices,
                        send sale request
                    </Text>
                </View>
            )
        }
    }

    const ProfileHeader = () => {
        return (
            <>

                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image className="rounded-full" style={{ height: 150, width: 150, margin: 20, borderWidth: 2, borderColor: "#50bf88" }} source={{ uri: user.avatar }} />
                </View>
                <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", margin: 20 }}>
                    <View>
                        <Text className="color-mint font-rsregular text-lg">{`${user.listings.length} Sales`}</Text>
                        <Text className="color-mint font-rsregular text-lg">Location: </Text>
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
                <View className="display-flex justify-center items-center m-5">
                    <Text className="color-mint font-rssemibold text-2xl">{`${own ? "Your" : `${user.username}'s`} listed prices`}</Text>
                </View>
            </>
        )
    }

    return (
        <SafeAreaView className="bg-primary h-full">

            <FlatList
                className={"m-5"}
                contentContainerStyle={{ justifyContent: 'center' }}
                data={prices}
                style={{ marginBottom: 0 }}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => console.log("draft sale proposal")} onLongPress={() => {
                        if (own) {
                            console.log("Edit card")
                        }
                        else return
                    }}>
                        <PriceCard card={item} />
                    </Pressable>
                )}
                ListHeaderComponent={() => (
                    <ProfileHeader />
                )}
                ListEmptyComponent={() => (
                    <ListEmptyComponent />
                )}
            />

            <AddCardFooter prices={prices} setPrices={setPrices} />
        </SafeAreaView>
    )
}

export default ProfileComponent
