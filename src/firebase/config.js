import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAuOA07GZTe91Ga2VAbVEn2GBz9EvKQOGg",
  authDomain: "restaurant-delivery-90c8e.firebaseapp.com",
  projectId: "restaurant-delivery-90c8e",
  storageBucket: "restaurant-delivery-90c8e.firebasestorage.app",
  messagingSenderId: "708920269205",
  appId: "1:708920269205:web:980cbc7e116dfdc6067e9c"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

const FirebaseFirestore = getFirestore(FirebaseApp);

export {
    FirebaseApp, FirebaseFirestore
}
