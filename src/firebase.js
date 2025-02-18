import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCoqjBVw2m_yBNgInQ9-tqk3wxMhZcfRrI",
    authDomain: "muktihostpital.firebaseapp.com",
    projectId: "muktihostpital",
    storageBucket: "muktihostpital.firebasestorage.app",
    messagingSenderId: "69844779902",
    appId: "1:69844779902:web:bbb85214c24f6adf6d292f",
    measurementId: "G-GZDJ4E09VN"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
