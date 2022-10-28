import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

//import 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjmadiAys3oixJNqsd1cKwc0akOhtO6GQ",
    authDomain: "ecommerce-776f0.firebaseapp.com",
    projectId: "ecommerce-776f0",
    storageBucket: "ecommerce-776f0.appspot.com",
    messagingSenderId: "1044403924333",
    appId: "1:1044403924333:web:231e58322584a1ef373e64"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
