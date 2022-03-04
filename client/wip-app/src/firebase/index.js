import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDT2JOu7KdnLuRNOO6VUKbmM5fbDrFxFD4",
  authDomain: "wipit-70f40.firebaseapp.com",
  projectId: "wipit-70f40",
  storageBucket: "wipit-70f40.appspot.com",
  messagingSenderId: "254355378687",
  appId: "1:254355378687:web:33071fc7f329e2c91797ca",
  measurementId: "G-EWLCDLX39G"
};

const app = initializeApp(firebaseConfig);

const storage = getFirestore(app);

export { storage, app as default };