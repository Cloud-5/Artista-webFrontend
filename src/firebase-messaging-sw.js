importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyDY2HU0m1AOkAbrydWIocDS9TRlD7lH93s",
  authDomain: "angular-chat-c21c3.firebaseapp.com",
  projectId: "angular-chat-c21c3",
  storageBucket: "angular-chat-c21c3.appspot.com",
  messagingSenderId: "455184474056",
  appId: "1:455184474056:web:cfa6398676083f316f6afd"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
