import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDzxM7Ov6Ni7Se-glcBNBAbrG-7glLvicc",
    authDomain: "gearshop-ad49b.firebaseapp.com",
    projectId: "gearshop-ad49b",
    storageBucket: "gearshop-ad49b.firebasestorage.app",
    messagingSenderId: "106857689081",
    appId: "1:106857689081:web:4858763dded798bf761728"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);