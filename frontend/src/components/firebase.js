
// firebase.js
import { initializeApp } from "firebase/app";
import  {getStorage} from'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCbXKCKEDS25KZwA7LieBGjh0U-ilstF6g",
  authDomain: "movieverse-f7355.firebaseapp.com",
  projectId: "movieverse-f7355",
  storageBucket: "movieverse-f7355.appspot.com",
  messagingSenderId: "307134739231",
  appId: "1:307134739231:web:f566a01e3005c8ea5df62a",
  measurementId: "G-HS3XQC21TQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDb=getStorage(app);

