// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQCxoaDp-nCYNL2-uIyh65yPCdnHcr86U",
  authDomain: "proyectofinal-51a97.firebaseapp.com",
  projectId: "proyectofinal-51a97",
  storageBucket: "proyectofinal-51a97.firebasestorage.app",
  messagingSenderId: "1065144033136",
  appId: "1:1065144033136:web:32a8ce6271efa48640b9b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
