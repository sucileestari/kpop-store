import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore"

import { db } from "../firebase"

const MEMBER_COLLECTION = "users"


// =========================
// ➕ ADD MEMBER
// =========================
export const addMember = async (data) => {
  try {
    const docRef = await addDoc(collection(db, MEMBER_COLLECTION), {
      name: data.name,
      whatsapp: data.whatsapp,
      lineId: data.lineId,
      createdAt: serverTimestamp(),
    })

    return docRef.id
  } catch (error) {
    console.error("ADD MEMBER ERROR:", error.code, error.message)
    throw error
  }
}


// =========================
// ❌ DELETE MEMBER
// =========================
export const deleteMember = async (id) => {
  try {
    await deleteDoc(doc(db, MEMBER_COLLECTION, id))
    return true
  } catch (error) {
    console.error("DELETE MEMBER ERROR:", error.code, error.message)
    throw error
  }
}


// =========================
// ✏️ UPDATE MEMBER
// =========================
export const updateMember = async (id, data) => {
  try {
    const ref = doc(db, MEMBER_COLLECTION, id)

    await updateDoc(ref, {
      name: data.name,
      whatsapp: data.whatsapp,
      lineId: data.lineId,
      updatedAt: serverTimestamp(),
    })

    return true
  } catch (error) {
    console.error("UPDATE MEMBER ERROR:", error.code, error.message)
    throw error
  }
}


// =========================
// 📥 GET ALL MEMBER (ONE TIME FETCH)
// =========================
export const getMembers = async () => {
  try {
    const snapshot = await getDocs(collection(db, MEMBER_COLLECTION))

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return data
  } catch (error) {
    console.error("GET MEMBERS ERROR:", error.code, error.message)
    throw error
  }
}