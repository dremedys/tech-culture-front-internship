import React , {useEffect} from "react";
import {fetchPosts} from "../../store/actions/post";
import {NavLink} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import classes from './PostList.module.css'
import Loader from "../../components/UI/Loader/Loader";
import comments_icon from '../../assets/images/comment-icon.png'
import {formatFromISO} from "../../services/common";

const PostList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.post.posts)
    const loading = useSelector(state => state.post.loadingPosts)

    useEffect(() => {
        dispatch(fetchPosts())
    },[dispatch])

    function renderPosts() {
        const postsBlock =  posts.map(post => {
            const {id, title,body, comments_count, created_at} = post
            return (
                <li className={classes.post} key={id}>
                        <NavLink to={'/posts/' + id}>
                            <header>
                                <h3>{title}</h3>
                            </header>
                            <p>{body}</p>
                            <div className={classes.meta}>
                                <div className={classes.commentsCountBlock}>
                                    <img alt={'Comment icon'} width={'15px'} src={comments_icon}/>
                                    <span className={classes.commentsCount}>{comments_count}</span>
                                </div>
                                <span className={classes.created_at}>{formatFromISO(created_at)}</span>
                            </div>
                            {post.image_url?
                            <img src={post.image_url}   alt={'post-img'}/>: null}
                        </NavLink>

                </li>
            )
        })
        return (
            <ul className={classes.PostList}>
                {postsBlock}
            </ul>
        )
    }

    return (
        <>
            <h1>Posts works</h1>
            {
                loading
                    ?  <Loader/>
                    :  renderPosts()

            }
        </>
    )
}

export default PostList
