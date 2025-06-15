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

const keuanganCollection = collection(db, 'keuangan')

export const createKeuangan = async (keuangan) => {
  return addDoc(keuanganCollection, keuangan)
}

export const getKeuangan = async (id) => {
  const KeuanganDoc = await getDoc(doc(db, 'keuangan', id))
  return KeuanganDoc.exists() ? KeuanganDoc.data() : null
}

export const updateKeuangan = (id, keuangan) => updateDoc(doc(db, 'keuangan', id), keuangan)

export const deleteKeuangan = (id) => deleteDoc(doc(db, 'keuangan', id))

export const useLoadkeuangan = () => {
  const keuangan = ref([])
  const unsubscribe = onSnapshot(keuanganCollection, (snapshot) => {
    keuangan.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(unsubscribe)
  return keuangan
}
