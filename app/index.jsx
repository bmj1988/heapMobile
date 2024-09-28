import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../context/GlobalProvider";
import images from '../constants/images'
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";

export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext()
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image source={images.diamondPlate} className="w-[300px] h-[300px]" resizeMode="contain" />
          <View className="relative mt-5">
            <Text className="text-3xl font-rsbold text-white text-center">
              Move scrap fast with <Text className="text-mint">Heap</Text>
            </Text>
          </View>
          <Text className="text-sm font-rsregular text-gray-100 mt-7 text-center">
            Mobile metal market platform for buying, selling and filing.
          </Text>
          <CustomButton title={"Continue with Email"} handlePress={() => router.push('/sign-in')} containerStyles="w-full mt-7" />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style='auto' />
    </SafeAreaView>
  );
}
