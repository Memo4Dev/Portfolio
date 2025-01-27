import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


const firebaseConfig = {
  apiKey: "AIzaSyAeBb--ewAISR-ejTCIbgfvP-mDgrLkycI",
  authDomain: "portofolio-5d01d.firebaseapp.com",
  projectId: "portofolio-5d01d",
  storageBucket: "portofolio-5d01d.firebasestorage.app",
  messagingSenderId: "258902631866",
  appId: "1:258902631866:web:40e73a95532c5f22ad2983",
  measurementId: "G-F38T7DY88J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };