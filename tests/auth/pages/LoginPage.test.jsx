import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"

import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth"
import {  startGoogleSignIn, startLoginWithEmailPasswrod } from "../../../src/store/auth/thunks"
import { notAuthenticatedState } from "../../fixtures/authFixtures"

const mockStartGoogleSignIn= jest.fn();
const mockStartLoginWithEmailPassword= jest.fn();
jest.mock('../../../src/store/auth/thunks',()=>({
    
    startGoogleSignIn:()=> mockStartGoogleSignIn,
    startLoginWithEmailPasswrod:()=> mockStartLoginWithEmailPassword
}))
const store = configureStore({
reducer: {
    auth:authSlice.reducer
},
preloadedState:{
    auth: notAuthenticatedState
}

})
describe('Pruebas en Login Page', () => { 

test('Debe de mnostrar el componente correctamente', () => {

        render (
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/> 
                </MemoryRouter>
            </Provider>
        )
 //   screen.debug();
 expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
 });
 
test('Boton de Google de llamar al StartGoogleID', () => {

    render (
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage/> 
            </MemoryRouter>
        </Provider>
    );
    const googleBtn= screen.getByLabelText('google-btn')
    fireEvent.click(googleBtn)
      console.log(store.getState())
    
 });

 test('Submit debe de llamar a startLoginWithEmailpassword ', () => {
  const email = 'marvix91@gmail.com'
  const password ='123456'
    render (
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage/> 
            </MemoryRouter>
        </Provider>
    );
    const emailField = screen.getByRole('textbox',{name:'Correo'});
    fireEvent.change(emailField,{target:{name:'email', value:email}})
    // console.log(emailField)
    // screen.debug(); 
    const passwodField = screen.getByTestId('password');
    fireEvent.change(emailField,{target:{name:'password', value:password}})
    
    
    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm)

  });
 });