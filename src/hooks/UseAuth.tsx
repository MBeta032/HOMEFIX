import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import type { RegisterData, UserData } from "../interfaces/Auth/InterfaceAuth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const userRef = doc(db, "usuarios", firebaseUser.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
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
          };

          await setDoc(userRef, newUserData);
          setUserData(newUserData);
        } else {
          setUserData(snap.data() as UserData);
        }
      } else {
        setUser(null);
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const register = async ({
    name,
    email,
    password,
    phone,
    address,
    city,
    zone,
  }: RegisterData): Promise<void> => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(firebaseUser, { displayName: name });

    const newUser: UserData = {
      uid: firebaseUser.uid,
      name,
      email,
      phone,
      address,
      city,
      zone,
      rol: "cliente",
      createdIn: new Date().toISOString(),
    };

    await setDoc(doc(db, "usuarios", firebaseUser.uid), newUser);
    setUserData(newUser);
  };

  const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginGoogle = async (): Promise<User> => {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    const userRef = doc(db, "usuarios", firebaseUser.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
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
      };

      await setDoc(userRef, newUserData);
      setUserData(newUserData);
    }

    return firebaseUser;
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  return {
    user,
    userData,
    register,
    login,
    logout,
    loading,
    loginGoogle,
  };
}

export default useAuth;