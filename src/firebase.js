// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCauAFZ9Ic2wRBqGiddYHSXCXtbFmEJ96E",
  authDomain: "clone-7d072.firebaseapp.com",
  projectId: "clone-7d072",
  storageBucket: "clone-7d072.appspot.com", // Fixed the storage bucket URL
  messagingSenderId: "517837933888",
  appId: "1:517837933888:web:853016972f6c465ac6bea5",
  measurementId: "G-KH983F082N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Initialize Auth
export const db = getFirestore(app); // Initialize Firestore
export const provider = new GoogleAuthProvider(); // Initialize Google Auth Provider

