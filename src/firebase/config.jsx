// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz5zD7TOUSsch-OTD-SgPJUR98noM5sSc",
  authDomain: "crud-test-bd927.firebaseapp.com",
  projectId: "crud-test-bd927",
  storageBucket: "crud-test-bd927.appspot.com",
  messagingSenderId: "161742957946",
  appId: "1:161742957946:web:67e2deb8c93aebfc333ac3",
  measurementId: "G-38GNZ69KBK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
