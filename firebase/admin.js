// firebase admin can only be used on the server.
const admin = require("firebase-admin");

let privateKey = process.env.FIREBASE_PRIVATE_KEY;
// If there is a private key we replace remove the blanks.
// We do this because vercel does not allow blanks in the private key.
if (privateKey) {
  privateKey = privateKey.replace(/\\n/g, "\n");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.NEXT_PUBLIC_PROJECTID,
      private_key: privateKey,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
export const FieldValue = admin.firestore.FieldValue;
