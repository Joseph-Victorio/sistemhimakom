import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAf0rtQWO7pXcoVR-6Hjr2Tkx4nxvb-dEk',
  authDomain: 'sisteminformasihimakom.firebaseapp.com',
  projectId: 'sisteminformasihimakom',
  storageBucket: 'sisteminformasihimakom.firebasestorage.app',
  messagingSenderId: '39723497157',
  appId: '1:39723497157:web:b5828fae1551e17f7262ac',
  measurementId: 'G-Y6P9N43TME',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
