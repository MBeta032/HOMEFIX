/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react"
import type { ReactNode } from "react"
import type { AuthContextType } from "../interfaces/Auth/InterfaceAuth"
import useAuth from "../hooks/UseAuth"

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    user,
    userData,
    loading,
    register,
    login,
    loginGoogle,
    updateUserData,
    rechargeAuth,
    changePassword,
    changeEmail,
    resetPassword,
    logout,
  } = useAuth()

  return (
    <AuthContext.Provider
      value={{
            user,
            userData,
            loading,
            register,
            login,
            loginGoogle,
            updateUserData,
            rechargeAuth,
            changePassword,
            changeEmail,
            resetPassword,
            logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}