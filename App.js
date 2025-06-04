
// 📦 Kona চ্যাট অ্যাপ (React + Firebase)

import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "firebase/database";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// 🔐 Firebase config
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

// 🔧 Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    const msgRef = ref(db, "messages");
    onValue(msgRef, (snapshot) => {
      const data = snapshot.val();
      const msgArray = data ? Object.values(data) : [];
      setMessages(msgArray);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const msgRef = ref(db, "messages");
    push(msgRef, {
      name: user.displayName,
      text: message,
    });
    setMessage("");
  };

  const login = () => {
    signInWithPopup(auth, provider);
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kona চ্যাট 💬</h1>
      {user ? (
        <>
          <div className="mb-4">স্বাগতম, {user.displayName} <button onClick={logout} className="text-sm text-blue-500">(লগআউট)</button></div>
          <div className="border h-64 overflow-y-scroll mb-4 p-2 bg-gray-100 rounded">
            {messages.map((msg, i) => (
              <div key={i}><strong>{msg.name}:</strong> {msg.text}</div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded px-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="মেসেজ লিখুন..."
            />
            <button
              className="bg-blue-500 text-white px-4 rounded"
              onClick={sendMessage}
            >পাঠান</button>
          </div>
        </>
      ) : (
        <button onClick={login} className="bg-green-500 text-white px-4 py-2 rounded">Google দিয়ে লগইন করুন</button>
      )}
    </div>
  );
}
