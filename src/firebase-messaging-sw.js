// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: 'AIzaSyAIPfaZTL6yT8-HMcC-GwMCjzlSTa9BbSo',
    authDomain: 'my-store-289d3.firebaseapp.com',
    databaseURL: 'https://my-store-289d3.firebaseio.com',
    projectId: 'my-store-289d3',
    storageBucket: 'my-store-289d3.appspot.com',
    messagingSenderId: '617495361089',
    appId: '1:617495361089:web:fe511e237f235ce69d38c0',
    measurementId: 'G-TVTD9X1FFH'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();