import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjInR_ImJeuIl_JuRD7nWAd3QoxsGPHxA",
  authDomain: "hivenimble.firebaseapp.com",
  projectId: "hivenimble",
  storageBucket: "hivenimble.firebasestorage.app",
  messagingSenderId: "1054736981436",
  appId: "1:1054736981436:web:8c479a83244046679f1fb9",
  measurementId: "G-QP2Z7B7C8L"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
