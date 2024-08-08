
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyChRBKP3Zqi5pcPDCfd2RZ_30JCnth-nYc",
  authDomain: "tipjar-65b52.firebaseapp.com",
  projectId: "tipjar-65b52",
  storageBucket: "tipjar-65b52.appspot.com",
  messagingSenderId: "166101072455",
  appId: "1:166101072455:web:c188b7cc188ce722d8cf62",
  measurementId: "G-S6XH14FMGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app)