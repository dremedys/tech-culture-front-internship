import {
    FETCH_POSTS_ERROR,
    FETCH_POSTS_START,
    FETCH_POSTS_SUCCESS,
} from "../actions/actionTypes";

export const initialState = {
    posts: [],
    loadingPosts: false,
    error: null,
}

export default function postReducer(state=initialState, action:any){
    switch (action.type){
        case FETCH_POSTS_START:
            return {
                ...state, loadingPosts: true
            }
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,loadingPosts:false, posts: action.posts
            }
        case FETCH_POSTS_ERROR:
            return {
                ...state, loadingPosts: false, error: action.error
            }
        default:
            return state
    }
}

