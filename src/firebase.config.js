import {getApp, getApps, initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAYDyPq0eki7pE3F2kmt8Drx66tabNym-U",
    authDomain: "apprestaurant-caaf5.firebaseapp.com",
    databaseURL: "https://apprestaurant-caaf5-default-rtdb.firebaseio.com",
    projectId: "apprestaurant-caaf5",
    storageBucket: "apprestaurant-caaf5.appspot.com",
    messagingSenderId: "142466775058",
    appId: "1:142466775058:web:476ae60e633fc6c755c0cb"
  }; 

const app = getApps.length > 0 ? getApp(): initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, firestore, storage};