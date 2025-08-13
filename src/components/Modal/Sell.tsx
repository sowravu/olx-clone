import { Modal, ModalBody } from 'flowbite-react';
import React, { useState } from 'react'
import Input from '../Input/Input';
import { userAuth } from '../context/Auth';
import type { Dispatch, SetStateAction } from "react";
import { addDoc, collection } from 'firebase/firestore';
import { fetchFromFirestore, firestore } from '../Firebase/Firebase';
import fileUpload from '../../assets/fileUpload.svg'
import loading from '../../assets/loading.gif'

import close from '../../assets/close.svg'




interface SellProps{
    toggleModalSell:()=>void;
    status:boolean
    setItems?: Dispatch<SetStateAction<any[] | null>>;
}


const Sell = ({toggleModalSell,status,setItems}:SellProps) => {
    const [title,SetTitle]=useState("")
    const [category,Setcategory]=useState("");
    const [Price,SetPrice]=useState(0)
    const [Description,setDescription] = useState('')
    const [submitting,SetSubmitting]=useState(false)

    const [image,setimagae]=useState<File | null>(null)


       const Auth=userAuth();


     const handleImageUpload=(event:any)=>{
        if(event.target.files) setimagae(event.target.files[0])
     }
      

    const handleSubmit=async(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    if(!Auth?.user){
        alert('plese login to continue')
        return;
    }
   
    SetSubmitting(true);

      const readImageAsDataurl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      localStorage.setItem(`image_${file.name}`, imageUrl);
      resolve(imageUrl);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

        let imageUrl='';
        if(image){
            try {

                imageUrl=await readImageAsDataurl(image)
            } catch (error) {
                console.log(error)
                alert('faild to read image')
                return
            }
        }

    const trimmedtitle=title.trim();
    const trimmedcategory=category.trim();
    const trimmedPrice=Price;
    const trimmedDescription=Description.trim();

    if(!trimmedtitle|| !trimmedcategory|| !trimmedPrice|| !trimmedDescription){
        alert("all fields are avalable")
        SetSubmitting(false)
        return
    }

    try {
        await addDoc(collection(firestore,"products"),
    {
        title,
        category,
        Price,
        imageUrl,
        Description,
        userId:Auth.user.uid,
        userName:Auth.user.displayName || 'Anonymous',
        createAt:new Date().toDateString()

    })

    const datas=await fetchFromFirestore();
if (setItems) {
  setItems(datas);
}
    toggleModalSell();
    
    } catch (error) {
        console.log(error)
        alert("faild to add items to the firestore")
        
    }finally{
        SetSubmitting(false)
    }

    

}
  return (
    <div>
         <Modal theme={{
            "content":{
                "base":"relative w-full p-4 md:h-auto",
                "inner":"relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
            },
         }} onClick={toggleModalSell} show={status}  className='bg-black' position='center' size='md' popup={true}  >
            <ModalBody className='bg-white h-96 p-0 rounded-md'   onClick={(event)=>event.stopPropagation()}>
              <img 
              onClick={()=>{
                toggleModalSell();
                setimagae(null);
              }}
              className='w-6 absolute z-10 top-6 right-8 cursor-pointer' 
              src={close} alt="" />

                <div className='p-6 pl-8 pr-8 pb-8'>
                    <p className='font-bold text-lg mb-3'>Sell Item</p>
                    <form onSubmit={handleSubmit} >
   
                   <Input  setInput={SetTitle}  placeholder='Title' />
                   <Input  setInput={Setcategory}  placeholder='category' />
                   <Input  setInput={SetPrice}  placeholder='price' />
                   <Input  setInput={setDescription}  placeholder='Description' />
                 <div className='pt-2 w-full relative'>
                    {image ? (
                    <div className='relative h-40 sm:h-60 w-full flex justify-center border-2 border-balck border-solid rounded-md overflow-hidden  '>
                             <img className='object-contain' src={URL.createObjectURL(image)} alt="" />
                    </div>
                ):(
                
                <div className='relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md'>
                        <input type="file"
                        onClick={handleImageUpload}
                        className='absolute inset-10 h-full opacity-0 cursor-pointer z-30' 
                        required 
                        />

                       
                       <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                             <img className="w-12" src={fileUpload} alt="" />
                                  <p className="text-center text-sm pt-2">Click to upload images</p>
                                 <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                              </div>
                        </div>
                
             )}    

                 </div>

                 
                   {
                    submitting? (
                        <div className='w-full flex h-14 justify-center pt-4 pb-2'>
                            <img src={loading} className='w-32 object-cover' alt="" />

                        </div>
                    ):(
                    <div className='w-full pt-2'>
                           <button  style={{backgroundColor:'#002f34'}} className='w-full p-3 rounded-lg text-white'>Sell Item</button>
                    </div>

                    )
               
                   }
                      
                    </form>
                </div>
            </ModalBody>

         </Modal>
    </div>
  )
}

export default Sell
