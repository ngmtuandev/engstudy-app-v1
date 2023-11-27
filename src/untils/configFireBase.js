import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCy-1jC9NcF5j0kGR3PuXpGJqBSeSr4roA",
  authDomain: "chatapp-208db.firebaseapp.com",
  projectId: "chatapp-208db",
  storageBucket: "chatapp-208db.appspot.com",
  messagingSenderId: "723100860441",
  appId: "1:723100860441:web:c50ee2f4ca1c97f3c62a88",
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
