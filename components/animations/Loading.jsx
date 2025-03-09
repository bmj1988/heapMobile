import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#50bf88"/>
      <Text className="text-lg font-rsbold color-mint">Loading feed...</Text>
    </View>
  )
}

export default Loading
