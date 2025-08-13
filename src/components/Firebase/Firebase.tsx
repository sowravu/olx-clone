
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5s034OwwsZDdZ2PveYF-Bu6qUCqTgFNI",
  authDomain: "olx-clone-f1ddc.firebaseapp.com",
  projectId: "olx-clone-f1ddc",
  storageBucket: "olx-clone-f1ddc.firebasestorage.app",
  messagingSenderId: "1071900720716",
  appId: "1:1071900720716:web:bf100f16cf2d6535e7bee9"
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