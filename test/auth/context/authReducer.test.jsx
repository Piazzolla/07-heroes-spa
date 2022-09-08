import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types";

describe('pruebas en authReducer', () => { 
    test('debe retornar el estado por defecto', () => { 
        const initialState = {
            logged: false,
        }

        const state = authReducer( initialState, {} );
        expect( state ).toBe( initialState );
     });

     test('login debe llamar al login y autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: { name: 'Lilibeth', id: '123' }
        }
        
        const state = authReducer( {}, action )
        expect( state.logged ).toBeTruthy();
        expect( state.user ).toEqual({ name: 'Lilibeth', id: '123' })
     })

     test('logout debe llamar al logout y borrar el name del usuario y logged en false', () => { 
        const state = authReducer({}, { type: types.logout });
        expect( state.logged ).toBeFalsy();
        expect( state.user ).toBeUndefined();
      })
 })