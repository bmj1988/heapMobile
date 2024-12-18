import { useEffect, useState } from "react"
import { Alert } from "react-native"

const useFunction = (fn) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn();
            const parsedData = await response.json()
            setData(parsedData)
        }
        catch (e) {
            Alert.alert("Error", e.message)
        }
        finally {

            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => fetchData();
    return { data, isLoading, refetch }
}

export default useFunction;
