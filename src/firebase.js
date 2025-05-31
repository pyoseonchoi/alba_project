import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDyiDwxGsn9iORexMZuMd13OtejnB59jx0",
  authDomain: "alba-project-20250524.firebaseapp.com",
  projectId: "alba-project-20250524",
  storageBucket: "alba-project-20250524.firebasestorage.app",
  messagingSenderId: "322789728675",
  appId: "1:322789728675:web:f80cbb27678ed10d1efa16"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;