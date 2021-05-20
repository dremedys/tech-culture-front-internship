import {
    FETCH_COMMENTS_ERROR,
    FETCH_COMMENTS_START, FETCH_COMMENTS_SUCCESS,
    FETCH_POST_ERROR, FETCH_POST_START, FETCH_POST_SUCCESS,
    FETCH_POSTS_ERROR,
    FETCH_POSTS_START,
    FETCH_POSTS_SUCCESS, RESET_POST_DETAIL,

} from "./actionTypes";
import {BASE_URL, TOKEN_ID} from "../../services/serverInfo";
import axios from "axios";
import {format, parseISO} from "date-fns";

export function fetchPosts(){
    return async dispatch => {
        dispatch(fetchPostsStart())
        try {
            const response = await axios.get(BASE_URL + '/posts.json?auth=' + TOKEN_ID)
            const posts = []
            const data = response.data
            Object.keys(data).forEach((key) => {
               const values = data[key]
                if(values.body && values.created_at && values.title && values.comments_count!==null && values.image_url!==null){
                    posts.push({
                        id: key,
                        title: values.title,
                        body: values.body,
                        created_at: values.created_at,
                        comments_count: values.comments_count,
                        image_url: values.image_url

                    })
                }

            })
            posts.sort((a,b) => (a.created_at > b.created_at) ? -1 : ((b.created_at > a.created_at) ? 1 : 0))

            dispatch(fetchPostsSuccess(posts))
        } catch (e) {
            dispatch(fetchPostsError(e))
        }
    }
}

export function likeComment(commentId){
    return async (dispatch) => {
        const response = await axios.get(  `${BASE_URL}/comments/${commentId}.json?auth=${TOKEN_ID}`)
        const comment = response.data
        let newLikes
        if(localStorage.getItem('likedComments') && localStorage.getItem('likedComments').includes(commentId)){
            newLikes = comment.likes - 1
            let current = localStorage.getItem('likedComments')
            localStorage.setItem('likedComments', current.replace(commentId, ' '))
        }
        else{
            newLikes = comment.likes + 1
            let current = localStorage.getItem('likedComments')
            localStorage.setItem('likedComments', current+ ' ' + commentId)
        }
        const updatedLikes = JSON.stringify({likes: newLikes})
        await axios.patch( `${BASE_URL}/comments/${commentId}.json?auth=${TOKEN_ID}`, updatedLikes)
        dispatch(fetchCommentsByPostId(comment.post_id))
    }
}


export function fetchPostById(postId) {
    return async dispatch => {
        dispatch(fetchPostStart())

        try {
            const response = await axios.get(  `${BASE_URL}/posts/${postId}.json?auth=${TOKEN_ID}`)
            const post = response.data

            dispatch(fetchPostSuccess({
                title: post.title,
                body: post.body,
                created_at: format(parseISO(post.created_at), "yyyy-MM-dd' 'HH:mm:ss"),
                image_url: post.image_url
            }))
        } catch (e) {
            dispatch(fetchPostError(e))
        }
    }
}
export function fetchPostStart(){
    return {
        type: FETCH_POST_START
    }
}
export function fetchPostSuccess(post){
    return{
        type: FETCH_POST_SUCCESS,
        post
    }
}
export function fetchPostError(error){
    return {
        type: FETCH_POST_ERROR,
        error
    }
}
export function resetPostDetail(){
    return{
        type: RESET_POST_DETAIL
    }
}


export function fetchCommentsByPostId(postId) {
    return async dispatch => {
        dispatch(fetchCommentsStart())

        try {
            const response = await axios.get(`${BASE_URL}/comments.json?auth=${TOKEN_ID}`)
            const data = response.data
            let comments = []
            Object.keys(data).forEach((key) => {
               const values = data[key]
                if(values.post_id === postId && values.content){
                    const values_ = {...values}
                    values_.id = key
                    comments.push(values_)
                }
            })

            dispatch(fetchCommentsSuccess(comments))
        } catch (e) {
            dispatch(fetchCommentsError(e))
        }
    }
}
export function fetchCommentsStart(){
    return {
        type: FETCH_COMMENTS_START
    }
}
export function fetchCommentsSuccess(comments){
    return{
        type: FETCH_COMMENTS_SUCCESS,
        comments
    }
}
export function fetchCommentsError(error){
    return {
        type: FETCH_COMMENTS_ERROR,
        error
    }
}
export function fetchPostsStart() {
    return {
        type: FETCH_POSTS_START
    }
}
export function fetchPostsError(error) {
    return {
        type: FETCH_POSTS_ERROR,
        error
    }
}
export function fetchPostsSuccess(posts){
    return {
        type: FETCH_POSTS_SUCCESS,
        posts
    }
}

