import {
    EDIT_PROFILE_ERROR,
    EDIT_PROFILE_START, EDIT_PROFILE_SUCCESS,
    FETCH_PROFILE_ERROR,
    FETCH_PROFILE_START, FETCH_PROFILE_SUCCESS, RESET_EDIT_PROFILE, RESET_PROFILE
} from "../actions/actionTypes";

export const initialState = {
    profile:null,
    profileLoading: true,
    profileError: false,
    profileEditSuccess: false,
    profileEditError: false,
    profileEditLoading: false
}

export default function profileReducer(state=initialState, action:any){
    switch (action.type){
        case FETCH_PROFILE_START:
            return {
                ...state, profileLoading: true
            }
        case FETCH_PROFILE_ERROR:
            return  {
                ...state, profileError: action.profileError,profileLoading: false
            }
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state, profileLoading: false,profile: action.profile
            }
        case RESET_PROFILE:
            return {
                ...state, profile: null
            }
        case EDIT_PROFILE_START:
            return {
                ...state, profileEditLoading: true, profileEditError: false
            }
        case EDIT_PROFILE_ERROR:{
            return {
                ...state, profileEditError: true, profileEditLoading: false
            }
        }
        case EDIT_PROFILE_SUCCESS:
            return {
                ...state, profileEditSuccess: true, profileEditLoading: false
            }
        case RESET_EDIT_PROFILE:
            return {
                ...state, profileEditSuccess: false, profileEditLoading: false,profileEditError: false
            }
        default:
            return state
    }
}

