import firebase from 'firebase';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyApmVNM4TNtSAp-RU6_1phKqWGS9zoprXk',
  authDomain: 'ajslidersv2-3226d.firebaseapp.com',
  projectId: 'ajslidersv2-3226d',
  storageBucket: 'ajslidersv2-3226d.appspot.com',
  messagingSenderId: '919945881549',
  appId: '1:919945881549:web:eb56f7b4880ad6ba8e4684',
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const storage = app.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
