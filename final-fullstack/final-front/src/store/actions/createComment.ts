import {API} from "../../axios/axios";
import {fetchComments} from "./postDetail";

export  default function createComment(content: string, post_id: number) {
    return async (dispatch:any) => {
        try {
            await API.post(`/api/posts/${post_id}/comments/`,
                {content,
                        post_id,
                        author_id:1}
                        )
            dispatch(fetchComments(post_id))
        } catch (e) {
            console.log(e)
        }
    }
}
