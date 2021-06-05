import {IPost, IComment} from "../../shared/models/models";
import {
    FETCH_COMMENTS_ERROR,
    FETCH_COMMENTS_START, FETCH_COMMENTS_SUCCESS,
    FETCH_POST_ERROR,
    FETCH_POST_START,
    FETCH_POST_SUCCESS, RESET_COMMENTS,
    RESET_POST_DETAIL
} from "./actionTypes";
import {API} from "../../axios/axios";

export function fetchPostDetails(postId: number) {
    return async (dispatch:any) => {
        dispatch(fetchPostDetailsStart())
        try {
            const response = await API.get(`api/posts/${postId}`)

            dispatch(fetchPostDetailsSuccess(response.data))
        } catch (e) {
            dispatch(fetchPostDetailsError(e))
        }
    }
}

export function fetchPostDetailsStart() {
    return {
        type: FETCH_POST_START
    }
}

export function fetchPostDetailsSuccess(post:IPost) {
    return {
        type: FETCH_POST_SUCCESS,
        post
    }
}

export function fetchPostDetailsError(postErrors:string) {
    return {
        type: FETCH_POST_ERROR,
        postErrors
    }
}

export function fetchPostDetailsReset() {
    return {
        type: RESET_POST_DETAIL
    }
}

export function fetchComments(postId: number) {
    return async (dispatch:any) => {
        dispatch(fetchCommentsStart())
        try {
            const response = await API.get(`api/comments/${postId}`)

            dispatch(fetchCommentsSuccess(response.data))
        } catch (e) {
            dispatch(fetchCommentsError(e))
        }
    }
}

export function fetchCommentsStart() {
    return{
        type: FETCH_COMMENTS_START
    }
}

export function fetchCommentsError(commentsError:string) {
    return {
        type: FETCH_COMMENTS_ERROR,
        commentsError
    }
}

export function fetchCommentsSuccess(comments: IComment[]) {
    return {
        type: FETCH_COMMENTS_SUCCESS,
        comments
    }
}

export function resetComments(){
    return {
        type: RESET_COMMENTS
    }
}

export function likeComment(comment_id:number) {
    return async (dispatch:any) => {
        try {
            const response = await API.post(`/api/comments/${comment_id}/likes/`, {comment_id, author_id:1} )
            dispatch(fetchComments(comment_id))
        } catch (e) {
        }
    }
}
