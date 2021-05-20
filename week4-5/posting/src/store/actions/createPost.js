import axios from "axios";
import {BASE_URL, TOKEN_ID} from "../../services/serverInfo";
import {SET_IMAGE_URL} from "./actionTypes";
export function createPost(post, url){
    return async (dispatch) => {
        const json = JSON.stringify(post)
        await axios.post(BASE_URL + '/posts.json?auth=' + TOKEN_ID, json)
    }
}
export function setImageUrl(image_url){
    return {
        action: SET_IMAGE_URL,
        image_url
    }
}
