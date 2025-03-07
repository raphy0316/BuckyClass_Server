import admin from "firebase-admin";
import { ENV } from "./env";


admin.initializeApp({
    credential: admin.credential.cert(ENV.FIREBASE_CREDENTIALS),
    databaseURL: ENV.FIREBASE_URL
});


export const db = admin.firestore();
