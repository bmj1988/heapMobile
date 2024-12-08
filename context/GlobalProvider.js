import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";
const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}


export const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                console.log("RES GET CURRENT USER", res)
                if (res) {
                    setIsLoggedIn(true)
                    setUser(res)
                }
                else {
                    setIsLoggedIn(false)
                    setUser(null)
                }
            })
            .catch((error) => {
                console.log("Catch block in global scope")
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn, setIsLoggedIn, user, setUser, isLoading, setIsLoading
            }}>
            {children}
        </GlobalContext.Provider>
    )
}
