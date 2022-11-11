import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
name: 'journal',
    initialState: {
     isSvaing: false,
     messageSaved:'',
     notes: [],
     activeNote:null,
        // active:{
        //     id:'ABC123',
        //     title:'',
        //     body:'',
        //     date:'1234567',
        //     imageUrls:[]

        // }
    },
    //Todo lo que se coloque en lo reducers debe ser sincrono no puede ser asincrono
    reducers: {
        savingNewNote:(state)=>{
            state.isSvaing=true;
        },
        addNewEmptyNote:(state,action)=>{
            state.notes.push(action.payload);
            state.isSvaing=false;
         },
         setActiveNote:(state,action)=>{
            state.active=action.payload;
            state.messageSaved='';
         },
         setNotes:(state,action)=>{
            state.notes=action.payload;
         },
         setSaving:(state)=>{
            state.isSvaing=true;
            state.messageSaved='';
            //Mensaje de error
         },
         updateNote:(state,action)=>{//payload es igual a la nota actualizada
            state.isSvaing= false;
            state.notes= state.notes.map(note=>{
                if(note.id === action.payload.id){
                    return action.payload;
                }
                return note;
            });
            //Mostrar mensaje de actualizacion

            state.messageSaved= `${action.payload.title}, actualizada correctamente`;
         },
         setPhotosToActiveNote:(state, action)=>{
            state.active.imageUrls=[...state.active.imageUrls, ...action.payload];
            state.isSvaing= false;
         },
         clearNotesLogout:(state)=>{
            state.isSvaing=false;
            state.messageSaved='';
            state.notes=[];
            state.active=null;
         },
         deleteNoteById:(state,action)=>{
            state.active=null;
            state.notes= state.notes.filter(note=>note.id!==action.payload)
            
         }
        }
    });


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
                setActiveNote,
                setNotes,
                setSaving,
                updateNote,
                deleteNoteById,
                increment,
                savingNewNote,
                setPhotosToActiveNote,
                clearNotesLogout
     } = journalSlice .actions;