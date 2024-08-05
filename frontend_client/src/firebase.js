// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuwhv2nLNSClh4_JJGf8OQFTGmvCd-cqg",
  authDomain: "journaling-auth.firebaseapp.com",
  projectId: "journaling-auth",
  storageBucket: "journaling-auth.appspot.com",
  messagingSenderId: "501014740925",
  appId: "1:501014740925:web:230cdb407d94cd54645cd4",
  measurementId: "G-KLWZHK4K0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword };
