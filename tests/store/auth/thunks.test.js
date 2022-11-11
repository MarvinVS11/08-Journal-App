 
import { loginWithEmailPassword, logoutFirebase, singInWithGoogle } from "../../../src/firebase/providers"; 
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPasswrod, startLogout} from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";
 
jest.mock('../../../src/firebase/providers');
describe('Pruebas en authThunks', () => { 
    const dispatch=jest.fn();
    beforeEach(()=>jest.clearAllMocks());

    test('Debe de invocar el checking credentials', async() => {

      await checkingAuthentication()(dispatch);
      expect(dispatch).toHaveBeenCalledWith(checkingCredentials())      
     });

     test('startGoogleSigIn debe de llamar a checkingCredentials y login - Exito', async() => {
        const loginData ={ok:true, ...demoUser};
        await singInWithGoogle.mockResolvedValue(loginData)
        //Thunk
        await startGoogleSignIn()(dispatch);

      })
     test('startGoogleSigIn debe de llamar a checkingCredentials y login - Error', async() => {
        const loginData ={ok:false, errorMessage:'Un error en Google'};
        await singInWithGoogle.mockResolvedValue(loginData)
        //Thunk
        await startGoogleSignIn()(dispatch);
        expect (dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect (dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));

      });
      test('startLoginWithEmailPasswrod debe de llamar checkingCredentials y Login - exito',async() => { 
            const loginData = {ok: true, ...demoUser};
            const formData ={emial:demoUser.email, password:'123454'}

            await loginWithEmailPassword.mockResolvedValue(loginData);

            await startLoginWithEmailPasswrod(formData)(dispatch);
            
            expect (dispatch).toHaveBeenCalledWith(checkingCredentials());
            expect (dispatch).toHaveBeenCalledWith(login(loginData));
       })
       test('startLogout debe de llamar logout de fireBase, clearNote y logout', async() => { 

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
       });
 })