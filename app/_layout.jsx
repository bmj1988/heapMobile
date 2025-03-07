import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Provider } from 'react-redux';
import store from '../store';
import { GlobalProvider } from '../context/GlobalProvider'
import { LocationProvider } from '../context/LocationProvider'

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "RobotoSlab-Black": require("../assets/fonts/RobotoSlab-Black.ttf"),
    "RobotoSlab-Bold": require("../assets/fonts/RobotoSlab-Bold.ttf"),
    "RobotoSlab-ExtraBold": require("../assets/fonts/RobotoSlab-ExtraBold.ttf"),
    "RobotoSlab-ExtraLight": require("../assets/fonts/RobotoSlab-ExtraLight.ttf"),
    "RobotoSlab-Light": require("../assets/fonts/RobotoSlab-Light.ttf"),
    "RobotoSlab-Medium": require("../assets/fonts/RobotoSlab-Medium.ttf"),
    "RobotoSlab-Regular": require("../assets/fonts/RobotoSlab-Regular.ttf"),
    "RobotoSlab-SemiBold": require("../assets/fonts/RobotoSlab-SemiBold.ttf"),
    "RobotoSlab-Thin": require("../assets/fonts/RobotoSlab-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw new Error("No error loading fonts.");

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null

  return (
    <Provider store={store}>
      <GlobalProvider>
        <LocationProvider>
          <Stack screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </LocationProvider>
      </GlobalProvider>
    </Provider>
  );
}
