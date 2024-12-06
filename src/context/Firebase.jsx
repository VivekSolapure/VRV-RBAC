import { createContext, useContext} from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, set, ref } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import 'firebase/compat/database'
import { getMessaging } from 'firebase/messaging/sw'
// require('dotenv').config()

const firebaseConfig = {
    apiKey: "AIzaSyAHYPinnc4ivDBbwJJhlEogLvkH8F-Q2dQ",
    authDomain: "user-9f605.firebaseapp.com",
    databaseURL: "https://user-9f605-default-rtdb.firebaseio.com",
    projectId: "user-9f605",
    storageBucket: "user-9f605.firebasestorage.app",
    messagingSenderId: "673944590968",
    appId: "1:673944590968:web:5e1a271a124d8451ef2b8d"
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


