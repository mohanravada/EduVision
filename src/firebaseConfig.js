// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3n1HH--xV6XSon_o05Uc_c-qPy3MD6NQ",
  authDomain: "eduvision-85e1d.firebaseapp.com",
  projectId: "eduvision-85e1d",
  storageBucket: "eduvision-85e1d.firebasestorage.app",
  messagingSenderId: "879286653808",
  appId: "1:879286653808:web:7459f1b5fb2ddb74ebf5b5",
  measurementId: "G-D438N6063T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);