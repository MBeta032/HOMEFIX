import type { User } from "firebase/auth"

export interface RegisterData {
    name: string
    email: string
    password: string
    confirmPassword: string
    phone: string
    address: string
    city: string
    zone: string
}

export interface UserData {
    uid: string
    name: string
    email: string
    phone: string
    address: string
    city: string
    zone: string
    rol: string
  createdIn: string
}

export interface AuthContextType {
    user: User | null
    userData: UserData | null
    loading: boolean
    register: (data: RegisterData) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    loginGoogle: () => Promise<User>
    updateUserData: (data: Partial<UserData>) => Promise<void>
    rechargeAuth: (currentPassword: string) => Promise<void>
    changePassword: (newPassword: string) => Promise<void>
    changeEmail: (newEmail: string) => Promise<void>
    resetPassword: () => Promise<void>
    logout: () => Promise<void>
}