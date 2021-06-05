import {CREATE_COMMENT} from "../actions/actionTypes";

const initialState = {
    comment: null
}
export default function createCommentReducer(state = initialState, action:any) {
    if(action.type === CREATE_COMMENT)
        return {
            ...state, comment: action.comment
        }
    else
        return state
}
