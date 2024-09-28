import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { useState } from 'react'
import icons from '../constants/icons'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery }) => {
    const pathName = usePathname();
    const [query, setQuery] = useState(initialQuery || '')
    return (

        <View className="w-[60%] h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-mint items-center flex-row space-x-4">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-rsregular"
                value={query}
                placeholderTextColor={"#CDCDE0"}
                onChangeText={(e) => setQuery(e)}
            />

            <TouchableOpacity onPress={() => {
                if (!query) {
                    Alert.alert('Missing query',
                        "Please input something to search results across database"
                    )
                }
                if (pathName.startsWith('/search')) router.setParams({ query })

                else router.push(`/search/${query}`)
            }}>
                <Image source={icons.search} className={"w-5 h-5"}
                    resizeMode='contain' />
            </TouchableOpacity>

        </View>

    )
}

export default SearchInput
