import type { User } from "firebase/auth"
 
export interface RegisterData {
    nombre : string
    email : string
    password : string
    telefono : string
    direccion : string
}

export interface UserData{
    uid : string
    nombre : string
    email : string
    password : string
    telefono : string
    direccion : string
    rol : string
    creadoEn : string
}

export interface AuthContextType{
    user: User | null
    userData: UserData |  null
    register: (data: RegisterData) => Promise<void>
    login: (email: string, password: string) =>Promise<void>
    logout : () => Promise <void>
}



