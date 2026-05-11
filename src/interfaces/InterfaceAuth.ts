import type { User } from "firebase/auth"
 
export interface RegisterData {
    name : string
    email : string
    password : string
    confirmPassword : string
    phone : string
    address : string
}

export interface UserData{
    uid : string
    name : string
    email : string
    phone : string
    address : string  
    rol : string
    createdIn : string
}

export interface AuthContextType{
    user: User | null
    userData: UserData |  null
    loading : boolean
    loginGoogle : () => Promise <User>
    register: (data: RegisterData) => Promise<void>
    login: (email: string, password: string) =>Promise<void>
    logout : () => Promise <void>
}



