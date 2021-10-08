import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

firebase.initializeApp(
    {
        apiKey: "AIzaSyDouEndO-iUwRpSeEIY4TkW1cuSjvG-h6Q",
        authDomain: "reels-1.firebaseapp.com",
        projectId: "reels-1",
        storageBucket: "reels-1.appspot.com",
        messagingSenderId: "575824029416",
        appId: "1:575824029416:web:98a08595837970fae28b5d"
    }
)
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();
// export default firebase;