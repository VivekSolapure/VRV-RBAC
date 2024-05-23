import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
    apiKey: "AIzaSyBpFQFZU5AEEj-8KHgd-wtxFXSyLAQCZA0",
    authDomain: "note-master-cc6f9.firebaseapp.com",
    databaseURL: "https://note-master-cc6f9-default-rtdb.firebaseio.com",
    projectId: "note-master-cc6f9",
    storageBucket: "note-master-cc6f9.appspot.com",
    messagingSenderId: "524060469383",
    appId: "1:524060469383:web:a25dabf670f6b3b56bb022"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);