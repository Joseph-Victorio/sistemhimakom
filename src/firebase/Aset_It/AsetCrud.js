import { ref, onUnmounted } from 'vue'
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../firebaseInit'

const inventoriCollection = collection(db, 'inventori')

export const createInventori = async (inventori) => {
  return addDoc(inventoriCollection, inventori)
}

export const getInventori = async (id) => {
  const InventoriDoc = await getDoc(doc(db, 'inventori', id))
  return InventoriDoc.exists() ? InventoriDoc.data() : null
}

export const updateInventori = (id, inventori) => updateDoc(doc(db, 'inventori', id), inventori)

export const deleteInventori = (id) => deleteDoc(doc(db, 'inventori', id))

export const useLoadInventori = () => {
  const inventori = ref([])
  const unsubscribe = onSnapshot(inventoriCollection, (snapshot) => {
    inventori.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(unsubscribe)
  return inventori
}
