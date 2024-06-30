
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,setPersistence,browserSessionPersistence} from 'firebase/auth'
import { getDatabase } from "firebase/database";
export {auth};
export {db};


const firebaseConfig = {
  apiKey: " ",
  authDomain: " ",
  projectId: "mydeepeyeai",
  storageBucket: "mydeepeyeai.appspot.com",
  messagingSenderId: "134637071784",
  appId: "",
  measurementId: "G-7N6G1GFCY9"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db=getDatabase(app);

setPersistence(auth, browserSessionPersistence);
