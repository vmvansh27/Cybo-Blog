import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEvn('VITE-FIREBASE_API_KEY'),
  authDomain: "cybo-blog.firebaseapp.com",
  projectId: "cybo-blog",
  storageBucket: "cybo-blog.firebasestorage.app",
  messagingSenderId: "169775079236",
  appId: "1:169775079236:web:eca19925c4f4e16dd20111"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
