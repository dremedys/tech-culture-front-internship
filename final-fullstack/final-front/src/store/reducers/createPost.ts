import {CREATE_POST_ERROR, CREATE_POST_RESET, CREATE_POST_START, CREATE_POST_SUCCESS} from "../actions/actionTypes";

const initialState = {
    loading: true,
    error: false,
    message:'',
}
export default function createPostReducer(state = initialState, action:any) {
    if(action.type === CREATE_POST_START)
        return {
            ...state, loading: true, message: 'Wait, post is being published'
        }
    if(action.type === CREATE_POST_ERROR)
        return  {
            ...state, error:true, message: action.message
        }
    if(action.type === CREATE_POST_SUCCESS)
        return {
            ...state, loading: false, error: false, message: 'Successfully added!'
        }
    if(action.type === CREATE_POST_RESET){
        return initialState
    }

    return state
}
