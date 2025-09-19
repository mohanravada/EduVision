// src/auth/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3n1HH--xV6XSon_o05Uc_c-qPy3MD6NQ",
  authDomain: "eduvision-85e1d.firebaseapp.com",
  projectId: "eduvision-85e1d",
  storageBucket: "eduvision-85e1d.appspot.com",  // ✅ corrected
  messagingSenderId: "879286653808",
  appId: "1:879286653808:web:7459f1b5fb2ddb74ebf5b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth for login
export const auth = getAuth(app);
