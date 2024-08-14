
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBp76TYf5kU04nI7t7d8JMFidUYene2HAY",
  authDomain: "idomaapp-da0fe.firebaseapp.com",
  projectId: "idomaapp-da0fe",
  storageBucket: "idomaapp-da0fe.appspot.com",
  messagingSenderId: "42230406695",
  appId: "1:42230406695:web:aa0af6c462928eb80a3802",
  measurementId: "G-YSBP0TF7ER"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();


export { auth };