import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote,setActiveNote, setNotes } from "./";
import {deleteNoteById, savingNewNote, setPhotosToActiveNote, setSaving, updateNote} from './journalSlice';
import { fileUpload, loadNotes } from "../../helpers";

//Thunks es cuando tengo tareas asincronas
export const startNewNote=()=>{

    return async (dispatch, getState)=>{
        dispatch(savingNewNote());
      const {uid } = getState().auth;
        //uid
        const newNote={
          imageUrls: [],
            title:'',
            body:'',
            date:new Date().getTime(),

           
        }
        const newDoc= doc(collection(FirebaseDB, `${uid}/journal/notes`));
        //const setDocResp= await setDoc(newDoc, newNote);
         await setDoc(newDoc, newNote);
         
         newNote.id = newDoc.id;
         //dispatch
            dispatch (addNewEmptyNote(newNote));
            dispatch (setActiveNote(newNote));
            //Dispatch (activarNote)
    }
}

export const startLoadinNotes=()=>{
    return async(dispatch, getState)=>{
        const {uid } = getState().auth;
        if(!uid) throw new Error('El UID no existe');

      const notes =  await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}
  export const startSaveNote =()=>{
    return async (dispatch, getState)=>{
        dispatch (setSaving());
        //Cuando se termina este procedimiento es porque ya la nota fue actualizada
        const {uid } = getState().auth;
        const {active:note } = getState().journal;
        const noteToFireStore={...note};
        delete noteToFireStore.id;

        //console.log(noteToFireStore)
        //conexion a base de datos de firebase
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`) ;
        //Impacto en base de datos en firebase docRef =referencia a base de datost, noteToFireStore data que quemos enviar., {merge:true}= si hay campo que existian en BD se mantienen
        await setDoc(docRef,noteToFireStore,{merge:true})

        dispatch (updateNote(note));

    }
  }
  export const startUploadingFiles=(files=[])=>{

    return async (dispatch)=>{
        dispatch(setSaving());
         
        const fileUploadPromises =[];
        //await fileUpload(files[0]);
        for (const file of files) {
            //Se almacenan los archivos
            fileUploadPromises.push(fileUpload(file))            
        }
       const photosUrls= await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photosUrls));
    }
  }

 export const startDeletingNote=()=>{
    return async(dispatch, getState)=>{
      const {uid}= getState().auth;
      const {active:note} = getState().journal;

      const docRef=doc(FirebaseDB,`${ uid }/journal/notes/${note.id}`);
       await deleteDoc(docRef);
      
      dispatch(deleteNoteById(note.id));
    }
  }