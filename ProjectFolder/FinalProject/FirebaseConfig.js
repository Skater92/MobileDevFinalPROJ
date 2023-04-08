import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB708yl3N7_6mT1GzvHAciFXORVx8z08nY",
  authDomain: "imperiumofmanlogin.firebaseapp.com",
  projectId: "imperiumofmanlogin",
  storageBucket: "imperiumofmanlogin.appspot.com",
  messagingSenderId: "452215251712",
  appId: "1:452215251712:web:2687ffa5bdec8185f709e5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
