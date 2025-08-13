import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell";
import  Card  from  '../Cards/Cards' ;
import { ItemContext } from "../context/Item";
import { fetchFromFirestore } from "../Firebase/Firebase";

const Home = () => {
  const [Openmodal, setModal] = useState(false);
  const [OpenmodalSell, setModalSell] = useState(false);
  const toggleModal = () => {
    setModal(!Openmodal);
  };

  const toggleModalSell = () => {
    setModalSell(!OpenmodalSell);
  };


  const itemsCtx=ItemContext();

  useEffect(()=>{
          const getItems= async()=>{
            const datas=await fetchFromFirestore();
            itemsCtx ?.setItems(datas)
          }
          getItems();

  },[])

   
  useEffect(()=>{
    console.log('updating items',itemsCtx?.items)
  },[itemsCtx?.items])


  return (
    <div>
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      
      <Login toggleModal={toggleModal} status={Openmodal}  />

      <Sell  setItems={(itemsCtx)?.setItems}  toggleModalSell={toggleModalSell}  status={OpenmodalSell}/>

     <Card    items={(itemsCtx)?.items || []} />

    </div>
  );
};

export default Home;
