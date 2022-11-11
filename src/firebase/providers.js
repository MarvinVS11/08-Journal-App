import { createUserWithEmailAndPassword, GoogleAuthProvider , signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle =async()=>{

    try {
        const result = await signInWithPopup (FirebaseAuth, googleProvider);
        const {displayName, email, photoURL,uid} = result.user;
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        return{
            ok:true,
            displayName, email, photoURL, uid
        }
       // console.log(user);

    } catch (error) {
         // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
     
        //console.log(error);
        return {
            ok:false,
            errorMessage,

        }
        
    }
}
export  const registerUserWhithEmailPassword= async({email,password,displayName})=>{
    try {
        console.log({email, password, displayName})
      const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
     const{uid, photoURL}=resp.user; 
     //Actualizar el usuario el displayName en FireBase
    await updateProfile(FirebaseAuth.currentUser , { displayName   });
     return{
        ok:true,
        uid, photoURL,email,displayName
     }
     console.log(resp)
    } catch (error) {
        return{ok:false,errorMessage:error.message}
    }
}

export const loginWithEmailPassword=async({email, password})=>{

    try {
        const resp=await signInWithEmailAndPassword(FirebaseAuth,email,password);
        const {uid, photoURL, displayName}=resp.user;
        return {
            ok:true,
            uid,photoURL,displayName
        }
        } catch (error) {
        return{ok:false,errorMessage:error.message}
    }
    //SignWithEmaiAndPassword
}
export const logoutFirebase= async()=>{
    return await FirebaseAuth.signOut();
}