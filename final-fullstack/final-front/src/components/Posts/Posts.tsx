import React from 'react';
import {IPost} from "../../shared/models/models";
import PostItem from './PostItem/PostItem'
import classes from './Posts.module.css'
import Spinner from "../Spinner/Spinner";

interface MyProps  {
    posts: IPost[],
    loading:boolean
}

const Posts = (props: MyProps) => {

    const renderPosts = props.posts.map((item:IPost) => {
        return (
            <PostItem key={item.id} post={item}></PostItem>
        )
    })

    if(!props.loading)
        return (
            <ul
                className={classes.PostList}
            >
                {renderPosts}
            </ul>
        )
    else
        return <Spinner/>
}

export default Posts
