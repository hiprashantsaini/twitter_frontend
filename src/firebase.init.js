// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHdcIBcJuvgIGV0F5cn8ibrKgLOxTroiM",
  authDomain: "create-a-website-like-tw-74ff3.firebaseapp.com",
  projectId: "create-a-website-like-tw-74ff3",
  storageBucket: "create-a-website-like-tw-74ff3.appspot.com",
  messagingSenderId: "758348217582",
  appId: "1:758348217582:web:4580d6c965ed006cb8c7ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export default auth;

// This firebase app is defined in src/context/firebase 
