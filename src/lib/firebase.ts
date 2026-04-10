import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD6KgUHLhYCrF0DyfW5q_uKYu2ZsrN8nl8",
  authDomain: "artfolio-c9465.firebaseapp.com",
  databaseURL: "https://artfolio-c9465-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "artfolio-c9465",
  storageBucket: "artfolio-c9465.firebasestorage.app",
  messagingSenderId: "15415094344",
  appId: "1:15415094344:web:b832355c28de21754d7c7d",
  measurementId: "G-LR0VHWQGG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);

// Analytics (Safe check for SSR/Environments where it might not be supported)
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export default app;
