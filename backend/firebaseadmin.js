// backend/firebaseAdmin.js
import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.SERVICE_ACCOUNT_PATH || "./serviceAccountKey.json")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const authAdmin = admin.auth();
export const db = admin.firestore();
export const bucket = admin.storage().bucket();
