import {API} from "../../axios/axios";
import {
    EDIT_PROFILE_ERROR,
    EDIT_PROFILE_START, EDIT_PROFILE_SUCCESS,
    FETCH_PROFILE_ERROR,
    FETCH_PROFILE_START,
    FETCH_PROFILE_SUCCESS, RESET_EDIT_PROFILE,
    RESET_PROFILE
} from "./actionTypes";
import {IProfile} from "../../shared/models/models";

export function fetchUserProfile(userId: string) {
    return async (dispatch:any) => {

        dispatch(fetchProfileStart())
        try {
            const response = await API.get(`api/profile/${userId}/`)
            dispatch(fetchProfileSuccess(response.data))
        } catch (e) {
            dispatch(fetchProfileError(e))
        }
    }
}

export function fetchProfileStart() {
    return {
        type: FETCH_PROFILE_START
    }
}

export function fetchProfileError(profileError:string){
    return {
        type: FETCH_PROFILE_ERROR,
        profileError
    }
}

export function fetchProfileSuccess(profile:IProfile){
    return {
        type: FETCH_PROFILE_SUCCESS,
        profile
    }
}

export function resetUserProfile(){
    return {
        type:RESET_PROFILE
    }
}

export function editProfile(user_id: string, description:string,avatar:any) {
    return async (dispatch:any) => {
        dispatch({type: EDIT_PROFILE_START});

        const updateData = new FormData();
        const user_id = localStorage.getItem('user_id')

        updateData.append('description', description);

         if (avatar) updateData.append('avatar', avatar, avatar.name);

        updateData.append('user_id', user_id || '');

        try {
            const response = await API.patch(`/api/profile/${user_id}/`, updateData);
            console.log(response.data)
            dispatch({
                type: EDIT_PROFILE_SUCCESS,

            })
            dispatch(fetchUserProfile(user_id || ''))
        } catch (e) {
            const error = e.response;
            console.log(error)
            let error_message;

            if (error) {
                if (error.status === 400) error_message = "Error was occurred. Please try later";
            } else
                error_message = "No connection or request timeout!";
            dispatch({type:EDIT_PROFILE_ERROR, payload: {error_message}})
        }
    }
}

export function resetEditProfile() {
    return {
        type:RESET_EDIT_PROFILE
    }
}
