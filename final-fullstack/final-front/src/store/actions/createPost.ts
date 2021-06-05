import {CREATE_POST_ERROR, CREATE_POST_RESET, CREATE_POST_START, CREATE_POST_SUCCESS} from "./actionTypes";
import {API} from "../../axios/axios";

export function createPost(title: string, body:string, image:any){
    return async (dispatch:any) => {
        dispatch(createPostStart())

        const updateData = new FormData();
        if(image)
            updateData.append('image', image, image.name)
        updateData.append('title',title)
        updateData.append('body',body)
        updateData.append('author_id','1')

        try {
            await API.post('/api/posts', updateData)
            dispatch(createPostSuccess())

        } catch (e) {
            dispatch(createPostError(JSON.stringify(e.response.data,null, )))
        }
    }
}


export function createPostStart(){
    return {
        type: CREATE_POST_START
    }
}

export function createPostError(message:string){
    return {
        type: CREATE_POST_ERROR, message
    }
}
export function createPostSuccess(){
    return {
        type: CREATE_POST_SUCCESS
    }
}
export function createPostReset() {
    return {
        type: CREATE_POST_RESET
    }
}
