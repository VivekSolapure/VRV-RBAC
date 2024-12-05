import { createContext, useContext} from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, set, ref } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import 'firebase/compat/database'
import { getMessaging } from 'firebase/messaging/sw'
// require('dotenv').config()

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);
const messaing=getMessaging(firebaseApp)

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext)
export const storage = getStorage();

export const FirebaseProvider = (props) => {
    const putData = (key, data) => set(ref(database, key), (data))

    return (
        <FirebaseContext.Provider value={{  putData, database, storage}}>{props.children}</FirebaseContext.Provider>
    )
}


