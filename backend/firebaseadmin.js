// backend/firebaseadmin.js
import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const authAdmin = admin.auth();
export const db = admin.firestore();
export const bucket = admin.storage().bucket();
