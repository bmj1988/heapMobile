import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import icons from '../constants/icons'
const FontAwesome6 = icons.FontAwesome6

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, subtitle, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-rsmedium">{title} <Text className="font-rsthin text-gray-100 ml-6 text-sm">{subtitle ? subtitle : ''}</Text></Text>
            <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-mint items-center flex-row">
                <TextInput
                    className="flex-1 text-white font-rssemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={"#7b7b8b"}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <FontAwesome6
                            name={showPassword ? "eye-slash" : "eye"}
                            size={15}
                            className="color-mint" />

                    </TouchableOpacity>
                )}
            </View>

        </View>
    )
}

export default FormField
