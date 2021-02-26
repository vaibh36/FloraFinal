import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD-DQ4FB-kL5kEBSCzs4QpTI_t_Tr9YiMA",
    authDomain: "flora-3e4ba.firebaseapp.com",
    projectId: "flora-3e4ba",
    storageBucket: "flora-3e4ba.appspot.com",
    messagingSenderId: "826796194369",
    appId: "1:826796194369:web:bbb2a6e731c518ec1f64c0",
    measurementId: "G-NK64JRC44E"
})

const auth = firebase.auth();
export {auth};