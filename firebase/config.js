import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import {
getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyBKuHJeascZTrwom6cw4BO6KNpFW3viKcc",
  authDomain: "rn-social-339a5.firebaseapp.com",
  projectId: "rn-social-339a5",
  storageBucket: "rn-social-339a5.appspot.com",
  messagingSenderId: "745416398063",
  appId: "1:745416398063:web:ebad93a01b08a21d3bf71a",
  measurementId: "G-V09QP3CMR0"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});