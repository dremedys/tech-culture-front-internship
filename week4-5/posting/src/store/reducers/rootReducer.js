import {combineReducers} from 'redux'
import postReducer from "./post";
import createReducer from "./createPost";


export default combineReducers({
    post: postReducer,
    create: createReducer
})
