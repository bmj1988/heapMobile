import { View, Pressable } from 'react-native'
import { useState } from 'react'
import icons from '../../constants/icons'
import ProfileMenuModal from './ProfileMenuModal'
const MaterialCommunityIcons = icons.MaterialCommunityIcons
const AccountDropdownMenu = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <View className="mr-5">
            <Pressable onPress={() => {
                console.log('click')
                setShowMenu(!showMenu)
                }}>
                <MaterialCommunityIcons
                    name={showMenu ? 'menu-open' : 'menu'}
                    size={30}
                    className="color-mint" />
            </Pressable>
            <ProfileMenuModal isVisible={showMenu} setVisible={setShowMenu} />
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
