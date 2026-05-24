import {
  EmailAuthProvider,
  GoogleAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  type User,
} from "firebase/auth"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../firebase/config"
import type { RegisterData, UserData } from "../interfaces/Auth/InterfaceAuth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const googleProvider = new GoogleAuthProvider()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)

        const userRef = doc(db, "usuarios", firebaseUser.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          setUserData(userSnap.data() as UserData)
        } else {
          const newUserData: UserData = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || "Cliente",
            email: firebaseUser.email || "",
            phone: "",
            address: "",
            city: "",
            zone: "",
            rol: "cliente",
            createdIn: new Date().toISOString(),
          }

          await setDoc(userRef, newUserData)
          setUserData(newUserData)
        }
      } else {
        setUser(null)
        setUserData(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const register = async ({
    name,
    email,
    password,
    phone,
    address,
    city,
    zone,
  }: RegisterData): Promise<void> => {
    await setPersistence(auth, browserLocalPersistence)

    const result = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(result.user, {
      displayName: name,
    })

    const newUser: UserData = {
      uid: result.user.uid,
      name,
      email,
      phone,
      address,
      city,
      zone,
      rol: "cliente",
      createdIn: new Date().toISOString(),
    }

    await setDoc(doc(db, "usuarios", result.user.uid), newUser)
    setUserData(newUser)
  }

  const login = async (email: string, password: string): Promise<void> => {
    await setPersistence(auth, browserLocalPersistence)
    await signInWithEmailAndPassword(auth, email, password)
  }

  const loginGoogle = async (): Promise<User> => {
    await setPersistence(auth, browserLocalPersistence)

    const result = await signInWithPopup(auth, googleProvider)
    const firebaseUser = result.user

    const userRef = doc(db, "usuarios", firebaseUser.uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      const newUserData: UserData = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || "Cliente",
        email: firebaseUser.email || "",
        phone: "",
        address: "",
        city: "",
        zone: "",
        rol: "cliente",
        createdIn: new Date().toISOString(),
      }

      await setDoc(userRef, newUserData)
      setUserData(newUserData)
    } else {
      setUserData(userSnap.data() as UserData)
    }

    return firebaseUser
  }

  const updateUserData = async (data: Partial<UserData>): Promise<void> => {
    if (!user) {
      throw new Error("No hay usuario autenticado")
    }

    const userRef = doc(db, "usuarios", user.uid)

    await updateDoc(userRef, data)

    if (data.name) {
      await updateProfile(user, {
        displayName: data.name,
      })
    }

    setUserData((prev) => {
      if (!prev) return prev
      return { ...prev, ...data }
    })
  }

  const rechargeAuth = async (currentPassword: string): Promise<void> => {
    if (!user || !user.email) {
      throw new Error("No hay usuario autenticado")
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)
  }

  const changePassword = async (newPassword: string): Promise<void> => {
    if (!user) {
      throw new Error("No hay usuario autenticado")
    }

    await updatePassword(user, newPassword)
  }

  const changeEmail = async (newEmail: string): Promise<void> => {
    if (!user) {
      throw new Error("No hay usuario autenticado")
    }

    await updateEmail(user, newEmail)
    await updateUserData({ email: newEmail })
  }

  const resetPassword = async (): Promise<void> => {
    const email = user?.email || userData?.email

    if (!email) {
      throw new Error("No hay correo disponible")
    }

    await sendPasswordResetEmail(auth, email)
  }

  const logout = async (): Promise<void> => {
    await signOut(auth)
  }

  return {
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
  }
}

export default useAuth
