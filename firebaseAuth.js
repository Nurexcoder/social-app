const { initializeApp } = require("firebase/app");
// const { getAnalytics } = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDBGmgzqTrL8YyQSW7bFKG5-y2pcCKAMPI",
    authDomain: "pyp-file.firebaseapp.com",
    projectId: "pyp-file",
    storageBucket: "pyp-file.appspot.com",
    messagingSenderId: "621995234639",
    appId: "1:621995234639:web:9934fca2b01e770f2a213a",
    measurementId: "G-WB4WD7FHMW",
};
const app = initializeApp(firebaseConfig)

module.exports = app;
