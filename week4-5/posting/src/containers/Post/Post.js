import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {fetchCommentsByPostId, fetchPostById, likeComment, resetPostDetail} from "../../store/actions/post";
import {NavLink,useRouteMatch} from "react-router-dom";
import CreateComment from "../createComment/CreateComment";
import classes from './Post.module.css'
import Loader from "../../components/UI/Loader/Loader";
import {formatFromISO} from "../../services/common";
import Comments from "../Comments/Comments";

const Post = () => {
    const dispatch = useDispatch()
    const match = useRouteMatch();

    const post = useSelector(state => state.post.post),
          comments = useSelector(state => state.post.comments),
          postLoading = useSelector(state => state.post.loadingPost),
          // commentsLoading = useSelector(state => state.post.loadingComments),
          id = match.params.id
          // loading = commentsLoading || postLoading

    useEffect(() => {
        dispatch(fetchPostById(id))
        dispatch(fetchCommentsByPostId(id))

        return () => resetPostDetail()
    },[dispatch, id]
    )

    return (
        <div className={classes.Post}>
            <NavLink to={'/'}> {'<'} Go back </NavLink>
            {   postLoading || !post  ? <Loader/>
                :  <>
                    <h3>{post.title}</h3>
                    <p className={classes.created_at}>{formatFromISO(post.created_at)}</p>
                    <p>{post.body}</p>
                    <h3>Comments</h3>
                    <CreateComment id={id}/>
                    <Comments id={id}></Comments>
                </>
            }
        </div>
    )
}

export default Post
