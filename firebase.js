// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXBTzf4LmxkwVR-bABnSppuwvYAR1L8k0",
  authDomain: "kona-chat.firebaseapp.com",
  databaseURL: "https://kona-chat-default-rtdb.firebaseio.com",
  projectId: "kona-chat",
  storageBucket: "kona-chat.firebasestorage.app",
  messagingSenderId: "102740315870",
  appId: "1:102740315870:web:d4cff35c75d97acd77fc4f",
  measurementId: "G-DWFF1P50EW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

