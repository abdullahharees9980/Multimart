
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDGhjySbg2eJLUoxBsVdHzAZTpXkSij724",
  authDomain: "multimart-1bace.firebaseapp.com",
  projectId: "multimart-1bace",
  storageBucket: "multimart-1bace.appspot.com",
  messagingSenderId: "113998825544",
  appId: "1:113998825544:web:339e973a40971c859f307d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db= getFirestore(app)
export const storage = getStorage(app)



export default app