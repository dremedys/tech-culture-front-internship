import {
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT, REGISTER_ERROR,
    REGISTER_START,
    REGISTER_SUCCESS, RESET
} from "../actions/actionTypes";

export const initialState = {
    loading: false,
    error: false,
    errorMessage: '',
    isLogged: !!localStorage.getItem('token'),
    success: false,
}
export default function authReducer(state= initialState, action: any) {
    switch (action.type){
        case LOGIN_START:
            return {...state,loading: true, errorMessage: ''}
        case LOGIN_SUCCESS:
            return {...state, loading:false, isLogged:true}
        case LOGIN_ERROR:
            return {...state,error: true, loading: false, errorMessage: action.errorMessage}
        case LOGOUT:
            return {...state, error: false, loading:false,  isLogged: false}
        case REGISTER_START:
            return {...state, error:false, loading: true, errorMessage: ''}
        case REGISTER_SUCCESS:
            return {...state,error: false, errorMessage: '',loading: false,success: true}
        case REGISTER_ERROR:
            return {...state,error: true, loading: false, errorMessage: action.errorMessage}
        case RESET:
            return {...state, loading: false,error:false,  errorMessage: '', success: false, isLogged: false}
        default:
            return state
    }
}
