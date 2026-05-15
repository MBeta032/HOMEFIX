/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react"
import type {  AuthContextType } from "../interfaces/InterfaceAuth"
import useAuth from "../hooks/UseAuth"

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children} : {children : React.ReactNode}){

    const {user, userData, register, login, updateUserData, changePassword, logout, loading, loginGoogle} = useAuth()

    return(
        <AuthContext.Provider value={{user, userData, register, login, updateUserData, changePassword, logout, loading, loginGoogle}}>
            {children}
        </AuthContext.Provider>
    )


}

    

