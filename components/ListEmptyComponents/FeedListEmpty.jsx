import React from 'react'
import { router } from 'expo-router'
import EmptyState from '../EmptyState'


export const FeedListEmptyComponent = () => {


    return (
        <EmptyState
            title={"No listings found."}
            subtitle={"Be the first to post a listing today!"}
            buttonText={"Post a listing"}
            onPress={router.push('/listings')}
        />
    )
}

export const FeedListFailedComponent = ({ onRefresh }) => {
    return <EmptyState
        title="Error loading feed"
        subtitle="Please check to make sure location services are enabled and try again"
        buttonText="Refresh"
        icon="exclamation-triangle"
        iconColor="flame"
        onPress={onRefresh}
    />
}
