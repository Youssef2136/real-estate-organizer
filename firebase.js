import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import {
  getAuth, onAuthStateChanged, setPersistence, inMemoryPersistence,
  signInWithEmailAndPassword, signOut, sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import {
  initializeFirestore, memoryLocalCache, doc, getDoc, setDoc, deleteDoc
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';

const required = ['apiKey','authDomain','projectId','messagingSenderId','appId'];
export const firebaseReady = required.every(k => {
  const value = String(firebaseConfig?.[k] || '');
  return value && !value.startsWith('YOUR_') && !value.includes('YOUR_PROJECT_ID');
});

let app = null, auth = null, db = null;
if (firebaseReady) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  // Firestore cache remains memory-only; no IndexedDB/local disk persistence.
  db = initializeFirestore(app, { localCache: memoryLocalCache() });
}

export {
  app, auth, db,
  onAuthStateChanged, setPersistence, inMemoryPersistence,
  signInWithEmailAndPassword, signOut, sendPasswordResetEmail,
  doc, getDoc, setDoc, deleteDoc
};
