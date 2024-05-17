import { createContext, useContext, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, set, ref, get, } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import firebase from "firebase/compat/app"
import 'firebase/compat/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext)
export const storage = getStorage();


export const errorMessage=()=>{


}

export const FirebaseProvider = (props) => {

    const [error, seterror] = useState('')

    const parseFirebaseErrorMessage = (errorMessage) => {
        try{
            const regex = /auth\/(.*)/; // Regular expression to extract the error code
            const match = errorMessage.match(regex);
            if (match && match.length > 1) {
              return match[1].replace(')', ''); // Remove the closing parenthesis
            } else {
              return 'Unknown Error';
            }
        }catch(error){
            console.error(error);
        }
        
      };

    const putData = (key, data) => set(ref(database, key), (data))




    return (
        <FirebaseContext.Provider value={{  putData, database, storage,error }}>{props.children}</FirebaseContext.Provider>
    )



}


