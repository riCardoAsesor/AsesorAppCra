// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCDdHfmiF7JeLYbv4PkdSYVv9xxU5j9cUA",
  authDomain: "ricardo-te-ayuda.firebaseapp.com",
  projectId: "ricardo-te-ayuda",
  storageBucket: "ricardo-te-ayuda.firebasestorage.app",
  messagingSenderId: "67818145861",
  appId: "1:67818145861:web:03769f8b1dafcb738b7b2c",
  measurementId: "G-B4CHNSGG7Z"
};

// Inicializar Firebase solo una vez
const app = initializeApp(firebaseConfig);

// Obtener instancias correctamente
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, AsyncStorage };










