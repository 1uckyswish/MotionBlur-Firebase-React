// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//* allows us to connect to database
import {getFirestore} from 'firebase/firestore';

//* get Auth from firebase
import {getAuth} from 'firebase/auth';

// for storage
import {getStorage, ref} from "firebase/storage"

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjR1_309-1PxCY29OY1NHBOyNx8ukY-oA",
  authDomain: "motionblurr-5f2e4.firebaseapp.com",
  projectId: "motionblurr-5f2e4",
  storageBucket: "motionblurr-5f2e4.appspot.com",
  messagingSenderId: "78637551183",
  appId: "1:78637551183:web:1536af878cfa8e3d05a43a",
  measurementId: "G-X3SC4E9ESN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// *set up database and export it
export const db = getFirestore(app);
export const auth = getAuth(app);

//set up storage and activate
export const storage = getStorage(app);