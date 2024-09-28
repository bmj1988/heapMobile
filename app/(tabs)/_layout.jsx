import { View, Text, Image } from 'react-native'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
// import { cubes, envelope, user, home } from "@expo/vector-icons/FontAwesome"
import TabsHeader from '../../components/TabsHeader'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <FontAwesome name={icon} color={color} size={20}/>
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
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
          headerShown: true,
          header: () => <TabsHeader />,
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
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"home"}
                color={color}
                name="Home"
                focused={focused} />
            )
          }} />
        <Tabs.Screen name="listings"
          options={{
            title: 'Listings',
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"cubes"}
                color={color}
                name="Listings"
                focused={focused} />
            )
          }} />
        <Tabs.Screen name="messages"
          options={{
            title: 'Messages',
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"envelope"}
                color={color}
                name="Messages"
                focused={focused} />
            )
          }} />
        <Tabs.Screen name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"user"}
                color={color}
                name="Profile"
                focused={focused} />
            )
          }} />
      </Tabs>
    </>
  )
}

export default TabsLayout
