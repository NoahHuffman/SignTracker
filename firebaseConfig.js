import { initializeApp } from "firebase/app";

const firebaseConfig = {
    // apiKey: '',
    authDomain: 'signtracker-cbc27.firebaseapp.com',
    projectId: 'signtracker-cbc27',
    storageBucket: 'signtracker-cbc27.firebasestorage.app',
    messagingSenderId: '319329509603',
    appId: '1:319329509603:android:5dcba948ec89e6a5c365d6',
}

const app = initializeApp(firebaseConfig);
export default app;