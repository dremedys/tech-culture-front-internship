import  firebase from 'firebase/app'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyB84-5XkEv5jiXmUeIpvS-hEnhAIeGkxWg",
    authDomain: "tech-culture-api.firebaseapp.com",
    databaseURL: "https://tech-culture-api-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tech-culture-api",
    storageBucket: "tech-culture-api.appspot.com",
    messagingSenderId: "982750163854",
    appId: "1:982750163854:web:295177e6fc9e8886dc2adf",
};

let app = firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {storage,firebase as default}
