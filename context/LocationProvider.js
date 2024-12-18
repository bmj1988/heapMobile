import { createContext, useContext, useState, useEffect } from "react";
import * as Location from 'expo-location'

const LocationContext = createContext();

export const useLocationContext = () => {
    return useContext(LocationContext)
}

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null)

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Without location permissions enabled, you will not be able to see results close to you.');
                return
            }
            let locationData = await Location.getCurrentPositionAsync({});
            // location object structure: "{"coords": {"latitude", "longitude"} }
            setLocation(locationData.coords)
        }
        getCurrentLocation()
    }, [])

    return (
        <LocationContext.Provider
            value={{
                location, setLocation
            }}>
            {children}
        </LocationContext.Provider>
    )
}
