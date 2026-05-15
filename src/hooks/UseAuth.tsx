import { GoogleAuthProvider,createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile, type User } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase/config.ts"
import { useEffect, useState } from "react"
import type { RegisterData, UserData } from "../interfaces/InterfaceAuth.ts"



export function useAuth(){
    const [user, setUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<UserData| null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const googleProvider = new GoogleAuthProvider()
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser)

                const userRef = doc(db, "usuarios", firebaseUser.uid)
                const snap = await getDoc(userRef)

                if (!snap.exists()) {
                    await setDoc(userRef, {
                        uid: firebaseUser.uid,
                        name: firebaseUser.displayName,
                        email: firebaseUser.email,
                        rol: "Cliente",
                        createdIn: new Date().toISOString()
                    })
                } else {
                    setUserData(snap.data() as UserData)
                }

            } else {
                setUser(null)
                setUserData(null)
            }
            setLoading(false)
        })
        return () => unsub()
    }, [])

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


    const login = async (email: string, password: string): Promise<void> => {
        await signInWithEmailAndPassword(auth, email, password)
    }

    const loginGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user

        await setDoc(doc(db, "usuarios", user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            rol: "Cliente",
            createdIn: new Date().toISOString()
        })

        return user
    }

    const updateUserData = async (data: Partial<UserData>): Promise<void> =>{
        if (!user) return

        const OldUser = doc(db, "usuarios", user.uid)
        await setDoc(OldUser, {...userData, ...data}, {merge : true})
        setUserData({...userData, ...data} as UserData)
    }
    
    const changePassword = async (newPassword: string): Promise<void> =>{
        if(!user) return

        await updatePassword(user, newPassword)
    }

    const logout = async(): Promise<void> =>{
        await signOut(auth)
    }

    return {user, userData, register, login, updateUserData, changePassword, logout, loading, loginGoogle}
    
}

export default useAuth