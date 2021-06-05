import {API} from "../../axios/axios";
import {
    FETCH_POSTS_ERROR,
    FETCH_POSTS_START,
    FETCH_POSTS_SUCCESS,
} from "./actionTypes";
import {IPost} from "../../shared/models/models";

export function fetchPosts(){
    return async (dispatch:any) => {
        dispatch(fetchPostsStart())
        try {
            const response = await API.get('/api/posts')

            dispatch(fetchPostsSuccess(response.data))
        } catch (e) {
            dispatch(fetchPostsError(e))
        }
    }
}

export function fetchUserPosts(userId: string){
    return async (dispatch:any) => {
        dispatch(fetchPostsStart())
        try {
            const response = await API.get('/api/user_posts/'+userId)

            dispatch(fetchPostsSuccess(response.data))
        } catch (e) {
            dispatch(fetchPostsError(e))
        }
    }
}


export function fetchPostsStart() {
    return {
        type: FETCH_POSTS_START
    }
}

export function fetchPostsError(error:string) {
    return {
        type: FETCH_POSTS_ERROR,
        error
    }
}

export function fetchPostsSuccess(posts:IPost[]) {
    return {
        type: FETCH_POSTS_SUCCESS,
        posts
    }
}
