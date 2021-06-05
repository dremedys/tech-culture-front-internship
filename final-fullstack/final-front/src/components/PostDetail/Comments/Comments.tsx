import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducer";
import {fetchComments, likeComment, resetComments} from "../../../store/actions/postDetail";
import {useRouteMatch} from "react-router-dom";
import {IComment} from "../../../shared/models/models";
import classes from './Comments.module.css'
import {formatFromISO} from "../../../services/common";
import Spinner from "../../Spinner/Spinner";
import {Button} from "@material-ui/core";

const Comments = () => {
    const isLogged = useSelector( ( (state: RootState) => state.auth.isLogged))

    const dispatch = useDispatch()
    const match = useRouteMatch();
    // @ts-ignore
    const  id = match.params.id

    // @ts-ignore
    const comments:IComment[]= useSelector( (state: RootState) => state.postDetail.comments)
    const loading = useSelector( ( (state: RootState) => state.postDetail.commentsLoading))

    useEffect(() => {
        dispatch(fetchComments(id))
        return () => {
            dispatch(resetComments())
        }
    },[dispatch,id])


    const handleLike = (commentId: number) => {
        dispatch(likeComment(commentId))
    }

    if(loading){
        return  <Spinner/>
    }

    const renderComments = comments.map((item, index) => {
        return (
            <div
                key={item.id}
                className={classes.comment}>
                <header>
                        <span>
                            Comment #{index+1}
                        </span>

                </header>
                <p className={classes.commentContent}>
                    {item.content}
                </p>
                <span
                    className={classes.date}
                >
                            {formatFromISO(item.created_at)}
                </span>
                <Button
                    className={classes.likeButton}
                    disabled={!isLogged}
                    variant="contained"
                    color="inherit"
                    title='Only users can like a comment.'
                    onClick={() => {handleLike(item.id)}}
                    size="small"
                    style={{display: 'block',
                        marginLeft: 20,
                        margin: 15,
                    }}
                >
                    Like
                    <span
                        className={classes.likes}
                        style={{paddingLeft:5}}
                    >
                        {item.likes_count}
                    </span>
                </Button>
            </div>
        )})

    return (
        <div className={classes.Comments}>
            <h3>Comments</h3>
            {comments.length?
                renderComments:
                <h3>No comments yet...</h3>
            }
        </div>
    )

}

export default Comments
