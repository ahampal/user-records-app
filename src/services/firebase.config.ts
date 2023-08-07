import { initializeApp } from "firebase/app";
import { collection, getFirestore, QueryDocumentSnapshot } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCZcMIt1cNBUWip4FpexgMjAUlWMaH9GLU",
    authDomain: "user-records-app.firebaseapp.com",
    projectId: "user-records-app",
    storageBucket: "user-records-app.appspot.com",
    messagingSenderId: "189805852661",
    appId: "1:189805852661:web:7ba4e1d8ea2f03b651d2bc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const converter = {
    toFirestore: (data: User) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as User
};

const userCollection = collection(db, 'users').withConverter(converter);

export default userCollection;
