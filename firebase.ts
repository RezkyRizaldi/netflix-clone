import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDC3zCE_NRhl9p6DQkLXZndPNW74Vj8_EM',
	authDomain: 'netflix-clone-de79a.firebaseapp.com',
	projectId: 'netflix-clone-de79a',
	storageBucket: 'netflix-clone-de79a.appspot.com',
	messagingSenderId: '435039784969',
	appId: '1:435039784969:web:b1e1593767a56012a9a8d8',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
