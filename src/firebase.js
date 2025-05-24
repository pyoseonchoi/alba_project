// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyiDwxGsn9iORexMZuMd13OtejnB59jx0",
  authDomain: "alba-project-20250524.firebaseapp.com",
  projectId: "alba-project-20250524",
  storageBucket: "alba-project-20250524.firebasestorage.app",
  messagingSenderId: "322789728675",
  appId: "1:322789728675:web:f80cbb27678ed10d1efa16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;