// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//console.log(import.meta.env)
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC0tvWmt_euHXaUPEkBJICr7BpjkS6BT4U",
//   authDomain: "react-cursos-d16f2.firebaseapp.com",
//   projectId: "react-cursos-d16f2",
//   storageBucket: "react-cursos-d16f2.appspot.com",
//   messagingSenderId: "501692011955",
//   appId: "1:501692011955:web:fb6ed66ee613f61552e7c6"
// };
// //Testin
//console.log(process.env)
const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID 
  
} = getEnvironments();
//console.log(env);
// const firebaseConfig = {
//   apiKey: "AIzaSyBHmhk7lwhFiTxgT9YRpYY8U_RdUaJQNNM",
//   authDomain: "test-react-66fbf.firebaseapp.com",
//   projectId: "test-react-66fbf",
//   storageBucket: "test-react-66fbf.appspot.com",
//   messagingSenderId: "753495594140",
//   appId: "1:753495594140:web:b0df4aac564832c4000959"
// };
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};
console.log(firebaseConfig)
// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FireBaseApp);
export const FirebaseDB = getFirestore(FireBaseApp);