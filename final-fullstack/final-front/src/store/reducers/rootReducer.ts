import {combineReducers} from "redux"

import authReducer from "./auth";
import postReducer from "./posts";
import postDetailReducer from "./postDetail";
import createPostReducer from "./createPost";
import createCommentReducer from "./createComment";
import profileReducer from "./profile";

export const rootReducer = combineReducers({
   auth: authReducer,
   posts:postReducer,
   postDetail: postDetailReducer,
   createPost: createPostReducer,
   createComment: createCommentReducer,
   profile: profileReducer
});
export type RootState = ReturnType<typeof rootReducer>
