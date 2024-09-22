import { View, Text, Image } from 'react-native'
import { Tabs } from 'expo-router'
import { cubes, envelope, user, home } from "@expo/vector-icons/FontAwesome"

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6" />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#50bf88',
          tabBarInactiveTintColor: '#CDCDE0',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84
          }
        }}>
        <Tabs.Screen name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={home}
                color={color}
                name="Home"
                focused={focused} />
            )
          }} />
          <Tabs.Screen name="listings"
          options={{
            title: 'Listings',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={cubes}
                color={color}
                name="Listings"
                focused={focused} />
            )
          }} />
          <Tabs.Screen name="messages"
          options={{
            title: 'Messages',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={envelope}
                color={color}
                name="Messages"
                focused={focused} />
            )
          }} />
          <Tabs.Screen name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={user}
                color={color}
                name="profile"
                focused={focused} />
            )
          }} />
      </Tabs>
    </>
  )
}

export default TabsLayout
