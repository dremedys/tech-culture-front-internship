import {
    FETCH_COMMENTS_ERROR,
    FETCH_COMMENTS_START, FETCH_COMMENTS_SUCCESS,
    FETCH_POST_ERROR,
    FETCH_POST_START,
    FETCH_POST_SUCCESS,
    RESET_POST_DETAIL
} from "../actions/actionTypes";

export const initialState = {
    post: null,
    postLoading: true,
    postErrors: null,
    comments: [],
    commentsLoading: true,
    commentsErrors: null
}

export default function postDetailReducer(state=initialState,action: any) {
    switch (action.type){
        case FETCH_POST_START:
            return {
                ...state, postLoading: true
            }
        case FETCH_POST_SUCCESS:
            return {
                ...state, postLoading: false, post: action.post
            }
        case FETCH_POST_ERROR:
            return {
                ...state, postLoading: false, postErrors: action.postErrors
            }
        case RESET_POST_DETAIL:
            return {
                ...state, post: null, postLoading: true
            }
        case FETCH_COMMENTS_START:
            return {
                ...state, commentsLoading: true
            }
        case FETCH_COMMENTS_ERROR:
            return {
                ...state, commentsErrors: action.commentsErrors,commentsLoading: false
            }
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state, commentsLoading: false,comments: action.comments
            }
        default:
            return state
    }
}
