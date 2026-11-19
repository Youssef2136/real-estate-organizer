import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import {
  getAuth, onAuthStateChanged, setPersistence, inMemoryPersistence,
  signInWithEmailAndPassword, signOut, sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import {
  initializeFirestore, memoryLocalCache, doc, getDoc, setDoc, deleteDoc
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';
import {
  getStorage, ref, uploadBytes, getDownloadURL, deleteObject
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-storage.js';

const required = ['apiKey','authDomain','projectId','storageBucket','messagingSenderId','appId'];
export const firebaseReady = required.every(k => {
  const value = String(firebaseConfig?.[k] || '');
  return value && !value.startsWith('YOUR_') && !value.includes('YOUR_PROJECT_ID');
});

let app = null, auth = null, db = null, storage = null;
if (firebaseReady) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  // Firestore is explicitly configured with memory-only cache (no IndexedDB disk cache).
  db = initializeFirestore(app, { localCache: memoryLocalCache() });
  storage = getStorage(app);
}

export {
  app, auth, db, storage,
  onAuthStateChanged, setPersistence, inMemoryPersistence,
  signInWithEmailAndPassword, signOut, sendPasswordResetEmail,
  doc, getDoc, setDoc, deleteDoc,
  ref, uploadBytes, getDownloadURL, deleteObject
};
