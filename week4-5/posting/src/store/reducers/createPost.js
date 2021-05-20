import {CREATE_POST, SET_IMAGE_URL} from "../actions/actionTypes";

const initialState = {
    post: null,
    image_url: ''
}
export default function createReducer(state = initialState, action) {
    if(action.type === CREATE_POST)
        return {
            ...state, post: action.post, image_url: action.image_url
        }
    if(action.type === SET_IMAGE_URL)
        return  {
            ...state, image_url: action.image_url
        }
    else
        return state
}
