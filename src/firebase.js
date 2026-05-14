import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAk4D9SYPlr-Wa7XRM-MquH8ay8EHKKXYc",
  authDomain: "kpop-store-881ad.firebaseapp.com",
  projectId: "kpop-store-881ad",
  storageBucket: "kpop-store-881ad.firebasestorage.app",
  messagingSenderId: "670615908518",
  appId: "1:670615908518:web:a63deaaf40fa6049404467",
  measurementId: "G-ZSP79SD5K9"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)