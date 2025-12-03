import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyA6MQuj4WqAsSdqEVNWSULcNncUL36aJZo",
    authDomain: "tiffin-service-a25b8.firebaseapp.com",
    projectId: "tiffin-service-a25b8",
    storageBucket: "tiffin-service-a25b8.firebasestorage.app",
    messagingSenderId: "1018381912060",
    appId: "1:1018381912060:web:4f8ee77461d382ab8bd479"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
