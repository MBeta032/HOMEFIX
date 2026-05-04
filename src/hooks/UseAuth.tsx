import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, type User } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase/config.ts"
import { useEffect, useState } from "react"
import type { RegisterData, UserData } from "../interfaces/InterfaceAuth.ts"



export function useAuth(){
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
        name,
        email,
        password,
        phone, 
        address,
    }: RegisterData) : Promise <void> =>{
        const {user: firebaseUser } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )

        await updateProfile(firebaseUser, {displayName: name })

        const newUser: UserData ={
            uid : firebaseUser.uid,
            name,
            email,
            phone,
            address,
            rol: "Cliente",
            createdIn: new Date().toISOString(),
        }

            await setDoc(doc(db, "usuarios", firebaseUser.uid), newUser)
            setUserData(newUser)
    }

    const login = async (email: string, password: string): Promise<void> =>{
        await signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async(): Promise<void> =>{
        await signOut(auth)
    }

    return {user, userData, register, login, logout, loading}
    
}

export default useAuth