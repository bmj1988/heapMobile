import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import EmptyState from './EmptyState'
import PriceCard from './PriceCard'

const PriceList = ({ own, prices }) => {
    return (
        <View>
            <FlatList
                className={"m-5"}
                contentContainerStyle={{ justifyContent: 'center' }}
                data={prices}
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
                // ListHeaderComponent={() => (
                // PRICE COMPARISON WITH BUYERS (CARDS) WITHIN RADIUS
                // )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title={"No cards found"}
                        subtitle={"Add cards today to advertise your pricing"}
                        buttonText={"Add a card"}
                        onPress={() => console.log("add card")}
                    />
                )}
            >

            </FlatList>
        </View>
    )
}

export default PriceList
