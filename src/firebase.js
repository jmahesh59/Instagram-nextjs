
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "process.env.NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "insta-next-419705.firebaseapp.com",
  projectId: "insta-next-419705",
  storageBucket: "insta-next-419705.appspot.com",
  messagingSenderId: "1049239567095",
  appId: "1:1049239567095:web:652983ea9dfd290543b1f2",
  measurementId: "G-C63CRGC3C3"
};
 
// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
