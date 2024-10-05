import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import ListingImagesCarousel from './ListingImagesCarousel';
import ListingTag from '../ListingTag';

const CustomModal = ({ visible, onClose, listing }) => {
    console.log(listing.tags)
    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer} className="rounded-2xl border-[1px] border-solid border-mint">
                    <Text style={styles.startText} className="font-rssemibold">{`Listing #${listing.$id}`}</Text>
                    <View>
                        <ListingImagesCarousel images={listing.images} />
                    </View>
                    <View>
                        <Text style={styles.startText} className="font-rssemibold mb-1">Description</Text>
                        <Text style={styles.centerText} className="font-rsregular">{listing.details}</Text>
                    </View>
                    <View>
                        <Text style={styles.startText} className="font-rssemibold mb-1">Tags</Text>
                        {listing.tags.map((tag) => {
                            return (
                                <ListingTag tag={tag} key={tag.$id} />
                            )
                        })}
                    </View>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>Close Modal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: '80%', // 80% of the parent component's width
        height: '80%', // 80% of the parent component's height
        backgroundColor: 'black', // Black background for the content area
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-between'
    },
    centerText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
    },
    startText: {
        textAlign: 'left',
        color: 'white',
        fontSize: 18,
    },
    endText: {
        textAlign: 'right',
        color: 'white',
        fontSize: 18,
    },
    closeButton: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default CustomModal;
