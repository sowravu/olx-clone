
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);

const Auth=getAuth(app)

const Provider=new GoogleAuthProvider();

const storage=getStorage()

const firestore=getFirestore()



const fetchFromFirestore= async()=>{
    try {
        const productCollection=collection(firestore,'products')
        const productsnapshort=await getDocs(productCollection)
        const productList=productsnapshort.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))
        console.log("fetched products from firestore",productList)
        return productList
    } catch (error) {
        console.error("Error fetching produts from firestore:",error)
           return  [];     
    }
}

export{
    Auth,
    Provider,
    storage,
    firestore,
    fetchFromFirestore
}