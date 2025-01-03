import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { CreateContext } from "./CreateContext";
import PropTypes from "prop-types";
import { collection, onSnapshot, query } from "firebase/firestore";

const StateContext = ({ children }) => {
  //estado para almacenar los datos de firebase
  const [products, setProducts] = useState([]);

  //vamosa a llamar a firestor de la consola de firebase para traer los datos
  const q = query(collection(db, "storeFirebase"));

  useEffect(()=>{
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        try {
            const getProduct = querySnapshot.docs.map((doc) =>({ 
                id: doc.id,
                ...doc.data(),
            }))
            setProducts(getProduct)
    
        } catch (error) {
            console.log(error);
        }
      });
      return ()=> unsubscribe()
  },[q])

  return (
    <CreateContext.Provider
      value={{
        products,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export default StateContext;

StateContext.propTypes = {
  children: PropTypes.node.isRequired,
};
