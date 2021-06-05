import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {fetchPostDetails, fetchPostDetailsReset} from "../../store/actions/postDetail";
import {Link, useRouteMatch} from "react-router-dom";
import Comments from "./Comments/Comments";
import CreateComent from "../CreateComment/CreateComent";
import classes from './PostDetail.module.css'
import {formatFromISO} from "../../services/common";
import {BASE_URL} from "../../axios/axios";
import Spinner from "../Spinner/Spinner";

const PostDetail = () => {
    const isLogged = useSelector( ( (state: RootState) => state.auth.isLogged))
    const match = useRouteMatch();
    // @ts-ignore
    const  id = +match.params.id

    const dispatch = useDispatch()
    // @ts-ignore
    const post = useSelector( (state: RootState) => state.postDetail.post)
    const loading = useSelector( ( (state: RootState) => state.postDetail.postLoading))

    useEffect(() => {
        dispatch(fetchPostDetails(id))
        return () => {
            dispatch(fetchPostDetailsReset())
        }
    },[dispatch,id])

    if(!loading) {
        return (
            <div className={classes.PostDetail}>
                <Link
                    to={'/'}> {'<'} Go back
                </Link>
                <div className={classes.postWrapper}>
                    <h3>
                        {post.title}
                    </h3>
                    <Link
                        to={`/users/${post.author.id}`} >
                        by @{post.author.username}
                    </Link>
                    <p>{post.body}</p>
                    <p
                        className={classes.createdAt}>
                        {formatFromISO(post.created_at)}
                    </p>
                    {post.image? <img
                        alt='post'
                        src={BASE_URL+post.image}
                        className={classes.postImage}
                    />: null}
                </div>
                {
                    isLogged? <CreateComent id={id}/>: null
                }
                <Comments/>
            </div>
        )
    }

    return (
        <Spinner/>
    )
}

export default PostDetail
