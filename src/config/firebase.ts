import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
	apiKey: "AIzaSyCBo3dUdGmJ3JeKPWJgEfRB9qrON5Xat2k",
	authDomain: "cap-healthcare.firebaseapp.com",
	projectId: "cap-healthcare",
	storageBucket: "cap-healthcare.firebasestorage.app",
	messagingSenderId: "349754001839",
	appId: "1:349754001839:web:bedf9ff06747af2ed9075a",
	measurementId: "G-PL2NHQV9J3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db as firestore, auth, AsyncStorage };
