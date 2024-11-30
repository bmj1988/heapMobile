import { View, Modal } from 'react-native'
// import { useGlobalContext } from '@/context/GlobalProvider'
import ListItem from './ListItem'
import { signOut } from '../../lib/appwrite'
import { router } from 'expo-router'

const ProfileMenuModal = ({ isVisible, setVisible }) => {
    // const { user } = useGlobalContext()

    const logout = () => {
        signOut()
        router.replace('/sign-in')
        setVisible(false)
    }

    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setVisible(false)}
        >
            <View style={{backgroundColor: 'rgba(0,0,0,0.5)'}} className="flex-1 justify-center items-center absolute top-0 bottom-0 right-0 left-0">
                <View className="rounded-2xl border-mint border-solid border-[1px] justify-evenly items-center h-[60%] w-[85%] bg-primary mt-[200px] my-20">
                    <ListItem label={'My Account'} onPress={() => console.log('my account')} textStyles="font-rsregular text-white text-xl text-center" />
                    <ListItem label={'Sales Records'} onPress={() => console.log('records')} textStyles="font-rsregular text-white text-xl text-center" />
                    <ListItem label={'Cat Log'} onPress={() => console.log('cat log')} textStyles="font-rsregular text-white text-xl text-center" />
                    <ListItem label={'Logout'} onPress={() => logout()} textStyles="font-rsregular text-carmine text-xl text-center" />
                </View>
            </View>
        </Modal>
    )
}

export default ProfileMenuModal
