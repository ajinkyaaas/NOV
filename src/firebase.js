// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqQcQ8JC28gCVjfFut0YUM3y7men7Xok4",
  authDomain: "novacommerce-4c25a.firebaseapp.com",
  projectId: "novacommerce-4c25a",
  storageBucket: "novacommerce-4c25a.firebasestorage.app",
  messagingSenderId: "413887192720",
  appId: "1:413887192720:web:197030657a89cce3c04215"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };