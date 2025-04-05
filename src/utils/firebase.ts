// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyASFwOTNhOpsxmzJqBz1BYVbVJL08xNnQo",
  authDomain: "italian-brainrot-b195d.firebaseapp.com",
  projectId: "italian-brainrot-b195d",
  storageBucket: "italian-brainrot-b195d.firebasestorage.app",
  messagingSenderId: "404339308674",
  appId: "1:404339308674:web:bb55e6f6a86ed01f3e1c9b",
  measurementId: "G-4204H1MJ42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {  db };