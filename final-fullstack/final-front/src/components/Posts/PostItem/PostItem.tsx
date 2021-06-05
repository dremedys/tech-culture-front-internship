import React from 'react';
import {IPost} from "../../../shared/models/models";
import {Link} from "react-router-dom";
import classes from './PostItem.module.css'
import comments_icon from '../../../assets/images/comment-icon.png'
import {formatFromISO} from "../../../services/common";
import {BASE_URL} from "../../../axios/axios";

interface MyProps  {
    post: IPost
}

const PostItem = (props: MyProps) => {
    const post = props.post
    const {id, title,body, comments_count, created_at,author} = post
    return (
        <li className={classes.post} key={id}>
                <header>
                    <Link to={`/posts/${id}`}> <h3>{title}</h3></Link>
                    <Link to={`/users/${author.id}`} >By @{author.username}</Link>
                </header>
                <p>{body}</p>
            {post.image? <img
                width={200}
                alt='post'
                src={BASE_URL+post.image}/>: null}

            <div className={classes.meta}>
                    <div className={classes.commentsCountBlock}>
                        <img
                            alt={'Comment icon'}
                            width={15}
                            src={comments_icon}/>
                        <span className={classes.commentsCount}>{comments_count}</span>
                    </div>
                    <span className={classes.created_at}>
                        {formatFromISO(created_at)}
                    </span>
                </div>
        </li>
    )
}

export default PostItem
