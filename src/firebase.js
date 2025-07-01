import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAxGd6CJb1HQHZNv2kzeZbmkp02ms3qj6s",
  authDomain: "netflix-clone-990ea.firebaseapp.com",
  projectId: "netflix-clone-990ea",
  storageBucket: "netflix-clone-990ea.firebasestorage.app",
  messagingSenderId: "346869140761",
  appId: "1:346869140761:web:d1929638534f63047d0988"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password) =>{
    try{
    const response =  await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    await addDoc(collection(db, "user"), {
        uid:user.uid,
        name,
        authProvider:"local",
        email
    });
    }
    catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
       console.log(error)
       toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout}