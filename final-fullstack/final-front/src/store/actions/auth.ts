import {API} from "../../axios/axios";
import jwt_decode from "jwt-decode";
import {IToken} from "../../shared/models/models";
import {
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_ERROR,
    REGISTER_START,
    REGISTER_SUCCESS, RESET
} from "./actionTypes";
import {removeTokensFromStorage, setAccessTokenToStorage, setRefreshTokenToStorage} from "../../services/common";


export function login(username:string, password:string) {
    return async function (dispatch: any) {
        dispatch(loginStart())

        const authData = {
            username,
            password
        }
        try {
            const response = await API.post('/auth/jwt/create/', authData);
            const data:IToken = response.data;

            setAccessTokenToStorage(data.access)
            setRefreshTokenToStorage(data.refresh)

            const decoded_token:IToken = jwt_decode(data.access);
            localStorage.setItem('user_id', decoded_token.user_id);
            dispatch(loginSuccess());


        } catch (e) {
            const error = e.response;
            let errorMessage = '';

            if (error) {
                if (error.status === 400) errorMessage = "Empty username or password";
                if (error.status === 401) errorMessage = "Invalid username or password";
            }
            else{
                errorMessage = "No connection or request timeout!";
            }

            dispatch(loginError(errorMessage))

        }
    }
}

export function register(username:string, password:string, description:string,image: any) {

    return async function (dispatch: any) {
        dispatch(registerStart())

        const authData = {
            username,
            password
        }

        try {
            const response = await API.post('/api/sign_up', authData);

            const user_id  = response.data.id

            // creating profile
            const updateData = new FormData();

            updateData.append('description', description)

            if(image) {
                updateData.append('avatar',image, image.name)
            }

            updateData.append('user_id',user_id)
            await API.post('/api/profile/', updateData)

            dispatch(registerSuccess());

        } catch (error) {
            let errorMessage = error.response.data

            errorMessage =  Object.keys(errorMessage).map(i=> {
                return `${i.toUpperCase()}, ${errorMessage[i]}`
            }).join(' ')

            dispatch(registerError(errorMessage))

        }
    }
}
export function loginStart() {
    return {
        type: LOGIN_START
    }
}

export function loginError(errorMessage:string) {
    return {
        type: LOGIN_ERROR,
        errorMessage
    }
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

export function logout() {
    removeTokensFromStorage()
    return {
        type: LOGOUT
    }
}

export function reset() {
    return {type:RESET}
}

export function registerStart() {
    return {
        type: REGISTER_START
    }
}
export function registerSuccess(){
    return {
        type: REGISTER_SUCCESS
    }

}
export function registerError(errorMessage:string){
    return {
        type: REGISTER_ERROR,
        errorMessage
    }
}




