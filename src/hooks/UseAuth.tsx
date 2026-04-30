/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react"
import type { AuthContextType, RegisterData, UserData } from "../interfaces/InterfaceAuth.ts"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, type User } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase/config.ts"


export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}: {children : React.ReactNode}){
    const [user, setUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<UserData| null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, async(firebaseUser) =>{
            if(firebaseUser){
                setUser(firebaseUser)

                const snap = await getDoc(doc(db, "usuarios", firebaseUser.uid))
                if(snap.exists()){
                    setUserData(snap.data() as UserData)
                }
            }else{
                setUser(null)
                setUserData(null)
            }
            setLoading(false)
        })

        return () => unsub()
    },[])

    const register = async ({
        nombre,
        email,
        password,
        telefono, 
        direccion,
    }: RegisterData) : Promise <void> =>{
        const {user: firebaseUser } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )

        await updateProfile(firebaseUser, {displayName: nombre })

        const newUser: UserData ={
            uid : firebaseUser.uid,
            nombre,
            email,
            password,
            telefono,
            direccion,
            rol: "Cliente",
            creadoEn: new Date().toISOString(),
        }

            await setDoc(doc(db, "usuarios", firebaseUser.uid), newUser)
            setUserData(newUser)
    }

    const login = async (email: string, password: string): Promise<void> =>{
        await signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async(): Promise<void> =>{
        await signOut(auth)
        setUser(null)
        setUserData(null)
    }

    if (loading) return <p>Cargando...</p>

    return(
        <AuthContext.Provider value={{user, userData, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
    

}