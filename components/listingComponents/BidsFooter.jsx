import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import BidDisplay from './BidDisplay';

const BidsFooter = ({ listing }) => {
    const bids = listing.bids
    return (
        <View className={`bg-primary w-full border-mint border-[1px] max-h-[40%]`}
            style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                width: '100%',
                borderBottomWidth: 0
            }}>

            <FlatList
                data={bids}
                renderItem={({ item }) => <BidDisplay bid={item} />}
                keyExtractor={(item, index) => item.id || index.toString()} // Use a unique key
                ListHeaderComponent={() => <Text ellipsizeMode='clip' numberOfLines={1} className={`font-rsbold color-mint text-xl text-center m-1`}>{`Active Bids for selected listing`}</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    ellipsisText: {
        width: 300, // Set a fixed width for overflow to occur
        overflow: 'hidden',
        textAlign: 'left',
        numberOfLines: 1,            // Truncates after one line
        ellipsizeMode: 'clip',        // Adds the ellipsis at the end of the line
    },
});

export default BidsFooter;
