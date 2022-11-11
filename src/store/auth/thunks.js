//import { async } from "@firebase/util";
import { loginWithEmailPassword, logoutFirebase, registerUserWhithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, logout,login } from "./"

export const checkingAuthentication=( )=>{

    return async (dispatch)=>{
            dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn=()=>{
    return async (dispatch)=>{
        dispatch(checkingCredentials());
     const result= await singInWithGoogle();
     console.log({result})
    if(!result.ok) return dispatch(logout(result.errorMessage));
    
    dispatch(login(result))
 }
}
export const startCreatingUserWithEmailPassword=({email, password, displayName})=>{
return async(dispatch)=>{
    dispatch (checkingCredentials());
    // const {ok, uid, photoURL, errorMessage}= await registerUserWhithEmailPassword({email, password, displayName})
    const  result = await registerUserWhithEmailPassword({email, password, displayName})
    
    if(!result.ok) return dispatch(logout (result.errorMessage));
  //  dispatch(login({uid, displayName, email, photoURL}));
    dispatch(login(result));
  //  console.log(resp)
}
}
export const startLoginWithEmailPasswrod=({email, password})=>{
    //Devuelve procedimiento asincerono del llamado de firebase
return async  (dispatch)=>{
    dispatch(checkingCredentials());
    const result= await loginWithEmailPassword({email, password})
    console.log( result)
    if(!result.ok) return dispatch(logout(result));
    dispatch(login(result))
}
}
export const startLogout=()=>{
    return async(dispatch)=>{
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout());

    }

}