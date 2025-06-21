import { ref, onUnmounted } from 'vue'
import bcrypt from 'bcryptjs'
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

const usersCollection = collection(db, 'users')

export const createUser = async (user) => {
  if (user.pass){
    const salt = await bcrypt.genSalt(10)
    user.pass = await bcrypt.hash(user.pass, salt)
  }
  return addDoc(usersCollection, user)
}

export const getUser = async (id) => {
  const userDoc = await getDoc(doc(db, 'users', id))
  return userDoc.exists() ? userDoc.data() : null
}


export const updateUser = async (id, user) => {
  const updatedUser = { ...user }

  // If password exists and is not already hashed
  if (updatedUser.password && !updatedUser.password.startsWith('$2a$')) {
    const salt = await bcrypt.genSalt(10)
    updatedUser.password = await bcrypt.hash(updatedUser.password, salt)
  }

  return updateDoc(doc(db, 'users', id), updatedUser)
}


export const deleteUser = (id) => deleteDoc(doc(db, 'users', id))

export const useLoadUsers = () => {
  const users = ref([])
  const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(unsubscribe)
  return users
}
