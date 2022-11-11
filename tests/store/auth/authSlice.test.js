import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures"

describe('Pruebas de AuthSlice', () => { 

    test('Debe de regreasar el estado inicial y llamarse auth', () => {

      expect(authSlice.name).toBe('auth')
      const state = authSlice.reducer(initialState,{});
      expect (state).toEqual(initialState)
     });

     test('Debe de realizar la autenticacion', () => {

      //  console.log(login(demoUser))
        const state= authSlice.reducer(initialState,login(demoUser));
        expect(state).toEqual({
            status: 'authenticated',//not-authenicated, authenticated
            uid: demoUser.uid,
            email:demoUser.email,
            displayName:demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage:null,  
        })
      });
   test('Debe de ralizar el logout sin argumentos', () => { 
        const state = authSlice.reducer(authenticatedState, logout());
        console.log(state) 
        expect(state).toEqual({
            
                status: 'not-authenicated',
                uid: null,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: undefined
              
        })

    });
    
    test('Debe de realizar el logput y mostrar un mensaje de error', () => { 
        const errorMessage= 'Credencuales no son correctas'

        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
        // console.log(state) 
        expect(state).toEqual({
            
                status: 'not-authenicated',
                uid: null,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: errorMessage
              
        })

     });

     test('Debe de cambiar el estado a Checking', () => {

        const state= authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking')
      })
 })