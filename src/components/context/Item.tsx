import { collection, getDocs } from "firebase/firestore";
import {  createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../Firebase/Firebase";
import type { ReactNode } from "react";


interface ItemsContextType {
  items: any[] | null;
  setItems: React.Dispatch<React.SetStateAction<any[] | null>>;
}


const Context=createContext<ItemsContextType | null>(null);

interface ItemsContextProviderProps {
  children: ReactNode;
}



export const ItemContext=()=>{ return useContext(Context);} //customHook



  export const ItemsContextProvider=({children}:ItemsContextProviderProps)=>{

 const [items, setItems] = useState<any[] | null>(null);

    useEffect(()=>{
        const fetchItemsFromFireStore= async()=>{
            try {
                const productsCollection=collection(firestore,'products')
                const productsnapshort=await getDocs(productsCollection)

               const productsList=productsnapshort.docs.map(doc=>({
               id:doc.id,
              ...doc.data()
           }))

           setItems(productsList)

            } catch (error) {
                 console.log(error,"error fetching products")
            }
        }
        fetchItemsFromFireStore()
    },[])

return (
    <>
         <Context.Provider   value={{items,setItems}}>
                 
                 {children}
                
         </Context.Provider>

    </>
)
}


