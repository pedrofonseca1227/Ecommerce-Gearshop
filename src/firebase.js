import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDzxM7Ov6Ni7Se-glcBNBAbrG-7glLvicc",
    authDomain: "gearshop-ad49b.firebaseapp.com",
    projectId: "gearshop-ad49b",
    storageBucket: "gearshop-ad49b.appspot.com",
    messagingSenderId: "106857689081",
    appId: "1:106857689081:web:4858763dded798bf761728"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app};
