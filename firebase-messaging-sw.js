
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyC3_QN2ln-4TqroUE92VzBbKR3Tc0VEILU",
    authDomain: "hmmmnot-44503.firebaseapp.com",
    databaseURL: "https://hmmmnot-44503.firebaseio.com",
    projectId: "hmmmnot-44503",
    storageBucket: "hmmmnot-44503.appspot.com",
    messagingSenderId: "981303123877",
    appId: "1:981303123877:web:a217e6d72a45800461124c",
    measurementId: "G-QS9HP3SSRY"
});

console.log("From Service Worker");
const messaging = firebase.messaging();