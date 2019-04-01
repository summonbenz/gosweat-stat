// import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'
import firebase from 'firebase';

// const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: 'sweatstat',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID
};
firebase.initializeApp(config);

// firebase.firestore().settings(settings);

export default firebase;