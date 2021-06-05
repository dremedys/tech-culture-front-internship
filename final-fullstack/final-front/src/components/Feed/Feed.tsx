import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {fetchPosts} from "../../store/actions/posts";

import Posts from "../Posts/Posts";

const Feed = () => {
    const dispatch = useDispatch()
    const posts = useSelector( ( (state: RootState) => state.posts.posts))
    const loading = useSelector( ( (state: RootState) => state.posts.loadingPosts))

    useEffect(() => {
        dispatch(fetchPosts())
    },[dispatch])
    
    return (
        <Posts posts={posts} loading={loading}/>
    )
}

export default Feed
