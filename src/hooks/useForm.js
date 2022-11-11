import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations={} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({

    })
    //Cada vez que hay un cabio en el formulario se va a ejecutar el funcion createValidators()
    useEffect(() => {
      createValidators();   
      
    }, [formState])

    //Cada vez que el inicial form cambia
    useEffect(() => {
       setFormState(initialForm);
    }, [initialForm])
    

    const isFormValid= useMemo(()=>{
         for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue]!==null) return false;
         }
        return true;   
    },[formValidation])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }
    const createValidators=()=>{
        const formCheckValues={};
        for (const formField of Object.keys(formValidations)) {
          //  console.log(formField)
          //Se desestructura lo que viende de formValidation basados en el formField
          const [fn, errorMessage]=formValidations[formField];
          formCheckValues[`${formField}Valid`]=fn( formState[formField] )? null:errorMessage
   } 
        setFormValidation(formCheckValues);
       
    }
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}