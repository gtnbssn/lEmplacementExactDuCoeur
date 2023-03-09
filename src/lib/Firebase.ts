import fbadmin from "firebase-admin";
import { FIREBASE_SERVICE_ACCOUNT_KEY } from "$env/static/private";

const serviceAccount = JSON.parse(
  FIREBASE_SERVICE_ACCOUNT_KEY as string
);

// Initialize our firebase for our application
let app = fbadmin.initializeApp({
  credential: fbadmin.credential.cert(serviceAccount)
}, "appname");
let db = fbadmin.firestore(app);
const usersCollection = db.collection("users");

export {
  db,
  usersCollection
}
