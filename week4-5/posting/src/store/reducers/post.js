import {
    FETCH_POSTS_ERROR,
    FETCH_POSTS_START,
    FETCH_POSTS_SUCCESS,
    FETCH_POST_START,
    FETCH_POST_ERROR,
    FETCH_POST_SUCCESS, FETCH_COMMENTS_START, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_ERROR, RESET_POST_DETAIL
} from "../actions/actionTypes";

const initialState = {
    posts: [],
    post: null,
    comments: null,
    loadingPosts: false,
    loadingCommentsNumber: false,
    loadingPost: false,
    loadingComments: false,
    error: null,
}

export default function postReducer(state=initialState, action){
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

        case FETCH_POST_START:
            return {
                ...state, loadingPosts: true
            }
        case FETCH_POST_SUCCESS:
            return {
                ...state,loadingPost:false, post: action.post
            }
        case FETCH_POST_ERROR:
            return {
                ...state, loadingPost: false, error: action.error
            }

        case RESET_POST_DETAIL:{
            return {
                ...state, post: null
            }
        }

        case FETCH_COMMENTS_START:
            return {
                ...state, loadingComments: true, error: action.error
            }
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state, loadingComments: false, comments: action.comments
            }
        case FETCH_COMMENTS_ERROR:
            return {
                ...state, loadingComments: false, error: action.error
            }
        default:
            return state
    }
}

