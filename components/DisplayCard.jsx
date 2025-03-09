import { View, TouchableOpacity } from 'react-native'

const DisplayCard = ({ slot1, slot2, slot3, slot4, selected }) => {
    // Count number of active slots to calculate width distribution
    const activeSlots = [slot1, slot2, slot3, slot4].filter(slot => slot !== undefined).length;
    const slotWidth = activeSlots > 0 ? `${100 / activeSlots}%` : "25%";

    return (
            <View className={`${selected ? "border-[1px] border-mint border-solid" : ""} h-[80px] w-[90%] bg-black-200 rounded-2xl p-1 flex-row items-center justify-between`}>
                {slot1 && (
                    <View style={{ width: slotWidth }} className="items-center justify-center">
                        {slot1}
                    </View>
                )}
                {slot2 && (
                    <View style={{ width: slotWidth }} className="items-center justify-center">
                        {slot2}
                    </View>
                )}
                {slot3 && (
                    <View style={{ width: slotWidth }} className="items-center justify-center">
                        {slot3}
                    </View>
                )}
                {slot4 && (
                    <View style={{ width: slotWidth }} className="items-center justify-center">
                        {slot4}
                    </View>
                )}
            </View>
    )
}

export default DisplayCard
