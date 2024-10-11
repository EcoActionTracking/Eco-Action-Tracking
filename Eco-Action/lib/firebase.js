import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALf4Ks0M1nG5yDcRax_0FqM2CYjfMAHGQ",
  authDomain: "eco-friendly-68a8a.firebaseapp.com",
  projectId: "eco-friendly-68a8a",
  storageBucket: "eco-friendly-68a8a.appspot.com",
  messagingSenderId: "389425529689",
  appId: "1:389425529689:web:d00dfbd388476ac4b4c248",
  measurementId: "G-2YZQ3TKMVS",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
