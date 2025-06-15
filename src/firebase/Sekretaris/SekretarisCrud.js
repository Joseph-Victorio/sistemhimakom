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

const arsipCollection = collection(db, 'arsip')

export const createArsip = async (arsip) => {
  return addDoc(arsipCollection, arsip)
}

export const getArsip = async (id) => {
  const ArsipDoc = await getDoc(doc(db, 'arsip', id))
  return ArsipDoc.exists() ? ArsipDoc.data() : null
}

export const updateArsip = (id, arsip) => updateDoc(doc(db, 'arsip', id), arsip)

export const deleteArsip = (id) => deleteDoc(doc(db, 'arsip', id))

export const useLoadarsip = () => {
  const arsip = ref([])
  const unsubscribe = onSnapshot(arsipCollection, (snapshot) => {
    arsip.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(unsubscribe)
  return arsip
}
