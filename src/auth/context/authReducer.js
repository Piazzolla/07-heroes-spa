import { types } from "../types/types";


/* puedo obviar esto y mandar en el parametro directamente state = {} */
const initialState = {
    logged: false,
}


export const authReducer = ( state = {}, action ) => {
    //nunca llamar a localStorage dentro de un reducer ninguna otra info que nos sea el state
    switch ( action.type ) {
        case types.login:
            return {
                ...state,
                logged: true,
                user: action.payload
            };
        case types.logout:
            return {
                logged: false
            };
        default:
            return state;

    }
}