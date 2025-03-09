import React from 'react'
import { router } from 'expo-router'
import Loading from '../animations/Loading'
import EmptyState from '../EmptyState'


const FeedListEmptyComponent = ({ status, onRefresh }) => {
    if (status === 'loading') {
        return <Loading />
    }
    else if (status === 'failed') {
        return <EmptyState
            title="Error loading feed"
            subtitle="Please check to make sure location services are enabled and try again"
            buttonText="Refresh"
            icon="exclamation-triangle"
            iconColor="flame"
            onPress={onRefresh}
        />
    }
    else {
        return (
            <EmptyState
                title={"No listings found."}
                subtitle={"Be the first to post a listing today!"}
                buttonText={"Post a listing"}
                onPress={ router.push('/listings')}
            />
        )
    }
}

export default FeedListEmptyComponent
