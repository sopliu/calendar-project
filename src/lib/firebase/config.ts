import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig: { [key: string]: string } = {
  apiKey: "AIzaSyAuXQ2serHi7ngUe-MOqIfYWzj9ADAuxVM",
  authDomain: "calmeet-604ea.firebaseapp.com",
  projectId: "calmeet-604ea",
  storageBucket: "calmeet-604ea.firebasestorage.app",
  messagingSenderId: "957213176223",
  appId: "1:957213176223:web:a54555a4fc7426c0e28daa",
  measurementId: "G-H488F4FBBR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
