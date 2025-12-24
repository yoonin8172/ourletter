// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAqfWZbX1ppPDOz49RQhOb6wJe7eGYGLQE",
    authDomain: "ourletter-3fc69.firebaseapp.com",
    projectId: "ourletter-3fc69",
    storageBucket: "ourletter-3fc69.firebasestorage.app",
    messagingSenderId: "538039619936",
    appId: "1:538039619936:web:8684a5f4b62f4ec0cdce05"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
