// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-54d93.firebaseapp.com",
  projectId: "mern-estate-54d93",
  storageBucket: "mern-estate-54d93.appspot.com",
  messagingSenderId: "855183969761",
  appId: "1:855183969761:web:943167cdbed4b29a97d6a0",
  measurementId: "G-KTYVLG0KF1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
