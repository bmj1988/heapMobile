import { Pressable, Text } from 'react-native'

const TextPressable = ({ onPress, text, textStyle }) => {
    return (
        <Pressable onPress={onPress}>
            <Text className={textStyle}>{text}</Text>
        </Pressable>
    )
}

export default TextPressable
