// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9Wowc_-TZZW2r8M13vtZ0DAoVFE7sPe0",
  authDomain: "netflixgpt-70612.firebaseapp.com",
  projectId: "netflixgpt-70612",
  storageBucket: "netflixgpt-70612.appspot.com",
  messagingSenderId: "421353617304",
  appId: "1:421353617304:web:759bf735469c6c555c9ded",
  measurementId: "G-V026LQ4S06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();