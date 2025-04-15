// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-4f4b4.firebaseapp.com",
  projectId: "taskmanager-4f4b4",
  storageBucket: "taskmanager-4f4b4.firebasestorage.app",
  messagingSenderId: "811829037186",
  appId: "1:811829037186:web:34291318296710b1810c9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export app so it can be imported elsewhere
export { app };
