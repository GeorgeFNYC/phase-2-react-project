import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAdd8gW7sHbVrayRtjB4etBJVGXE56a6B4",
    authDomain: "gands-59fa1.firebaseapp.com",
    projectId: "gands-59fa1",
    storageBucket: "gands-59fa1.appspot.com",
    messagingSenderId: "508258168314",
    appId: "1:508258168314:web:65ba9e1afd512027c24843",
    measurementId: "G-KQF01G0YJ7"
  };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);