import { View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import SearchInput from '../SearchInput'
import AccountDropdownMenu from './AccountDropdownMenu'

const TabsHeader = () => {
    return (
        <SafeAreaView className="bg-primary">
            <View className="flex-row h-12 w-full items-center justify-between mt-[5px]">
                <Image source={images.diamondPlate} className="h-10 w-10 px-4 ml-5" resizeMode='contain'/>
                <SearchInput />
                <AccountDropdownMenu />
            </View>
        </SafeAreaView>
    )
}

export default TabsHeader
