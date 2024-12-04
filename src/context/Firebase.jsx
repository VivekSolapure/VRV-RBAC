import { createContext, useContext} from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, set, ref } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import 'firebase/compat/database'
import { getMessaging } from 'firebase/messaging/sw'

const firebaseConfig = {
    apiKey: "AIzaSyBpFQFZU5AEEj-8KHgd-wtxFXSyLAQCZA0",
    authDomain: "note-master-cc6f9.firebaseapp.com",
    databaseURL: "https://note-master-cc6f9-default-rtdb.firebaseio.com",
    projectId: "note-master-cc6f9",
    storageBucket: "note-master-cc6f9.appspot.com",
    messagingSenderId: "524060469383",
    appId: "1:524060469383:web:a25dabf670f6b3b56bb022"
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


