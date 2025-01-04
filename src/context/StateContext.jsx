import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { CreateContext } from "./CreateContext";
import PropTypes from "prop-types";
import { collection, onSnapshot, query } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const StateContext = ({ children }) => {
  //estado para almacenar los datos de firebase
  const [products, setProducts] = useState([]);
  //creamos un estado para lamacenar usuario activo
  const [userActived, setUserActived] = useState(null)

  //vamosa a llamar a firestor de la consola de firebase para traer los datos
  const q = query(collection(db, "storeFirebase"));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const getProduct = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(getProduct);
      } catch (error) {
        console.log(error);
      }
    });
    return () => unsubscribe();
  }, [q]);

  //usamos las funciones de register de firebase para registrar los datos
  const registerUser = async (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  //creamos la funcion de login o inicio de secion
  const loginUser = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  //vamos a resetear el password
  const resetPassword = async (email)=> sendPasswordResetEmail(auth, email)

  //cerramos la secion del usuario
  const signOutUser = async()=> signOut(auth)

  //creamos el inicio de secion de google
  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  //creamos un observador para el estado del inicio de secion del usuario
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth ,(user) => {
      if(user){
        setUserActived(user)
        console.log(user)
      }else{
        setUserActived(null)
      }
    })
    return () => unsubscribe()
  },[])

  return (
    <CreateContext.Provider
      value={{
        products,
        registerUser,
        loginUser,
        resetPassword,
        signOutUser,
        signInGoogle,
        userActived,
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
