import { View, Pressable } from 'react-native'
import { useState } from 'react'
import icons from '../../constants/icons'
import ListItem from './ListItem'
import { router } from 'expo-router'
const MaterialCommunityIcons = icons.MaterialCommunityIcons
const AccountDropdownMenu = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <View className="mr-5">
            <Pressable onPress={() => setShowMenu(!showMenu)}>
                <MaterialCommunityIcons
                    name={showMenu ? 'menu-open' : 'menu'}
                    size={30}
                    className="color-mint" />
            </Pressable>
            {showMenu && (
                <View className="absolute mt-2 w-40 right-1 top-5 border-mint border rounded bg-primary p-2 z-5">
                    <View>
                        <ListItem label={'My Account'} onPress={() => router.replace('/sign-in')} textStyles="font-rsregular text-white text-xl text-center" />
                        <ListItem label={'Sales Records'} onPress={() => router.replace('/sign-in')} textStyles="font-rsregular text-white text-xl text-center" />
                        <ListItem label={'Cat Log'} onPress={() => router.replace('/sign-in')} textStyles="font-rsregular text-white text-xl text-center" />
                        <ListItem label={'Logout'} onPress={() => router.replace('/sign-in')} textStyles="font-rsregular text-white text-xl text-center" />
                    </View>
                </View>
            )}
        </View>
    )
}

export default AccountDropdownMenu

/* Listing history
Messages
My Account
Sale recorder
Cat logger
Logout */
