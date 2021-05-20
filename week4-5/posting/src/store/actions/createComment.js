import axios from "axios";
import {BASE_URL, TOKEN_ID} from "../../services/serverInfo";

export function createComment(comment){
    return async (dispatch) => {
        const json = JSON.stringify(comment)
        const postId = comment.post_id

        await axios.post(BASE_URL + '/comments.json?auth=' + TOKEN_ID,json)

        const response = await axios.get(  `${BASE_URL}/posts/${postId}.json?auth=${TOKEN_ID}`)
        const post = response.data
        const new_comments_count = post.comments_count + 1

        const updatedCommentsCount = JSON.stringify({comments_count: new_comments_count})
        await axios.patch( `${BASE_URL}/posts/${postId}.json?auth=${TOKEN_ID}`, updatedCommentsCount)

    }
}
