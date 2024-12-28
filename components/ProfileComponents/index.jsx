import { View, Text } from 'react-native'
import React from 'react'

const ProfileMain = ({ user, own }) => {
    /// if a user owns the account, they will have access to editing features in their
    /// bio like username and location and avatar
    const updateUser = () => {
        if (avatar) {
            // upload avatar picture to bucket
            // return url
            // delete old avatar picture
        }
        // let data = { username, location, avatar }
        // pingFunction HTTP headers username, location, avatarURL
        // set returned user attributes as user with setUser
    }
    return (
        <View>
            <Text>ProfileMain</Text>
        </View>
    )
}

export default ProfileMain
