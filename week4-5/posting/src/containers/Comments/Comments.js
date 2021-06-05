import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchCommentsByPostId, fetchPostById, likeComment, resetPostDetail} from "../../store/actions/post";
import classes from "../Post/Post.module.css";
import {formatFromISO} from "../../services/common";
import likedIcon from '../../assets/images/liked.png'
import notLikedIcon from '../../assets/images/notLiked.png'

const Comments = ({id}) => {
    const dispatch = useDispatch()

    const comments = useSelector(state => state.post.comments),
        commentsLoading = useSelector(state => state.post.loadingComments)

    useEffect(() => {
            dispatch(fetchCommentsByPostId(id))

        },[dispatch, id]
    )

    if(commentsLoading){
        return <h1>Loading comments</h1>
    }


    return comments.map((item, index) => {
        let likeItem = notLikedIcon,
            cls = classes.notLikedCount
        if(localStorage.getItem('likedComments') && localStorage.getItem('likedComments').includes(item.id)){
            likeItem = likedIcon
            cls = classes.likedCount
        }
            return (
            <div key={item.content} className={classes.comment}>
                <header>
                        <span>
                            Comment #{index+1}
                        </span>
                    <span>
                            {formatFromISO(item.created_at)}
                        </span>
                </header>
                <p>
                    {item.content}
                </p>
                <div className={classes.likes}>
                    <img
                         width={16}
                         src={likeItem}
                         onClick={() => {
                        dispatch(likeComment(item.id))}
                    }/>
                    <span className={cls}>{item.likes}</span>
                </div>
            </div>
        )
    }
    )
}

export default Comments
