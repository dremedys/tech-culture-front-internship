import React, {useState} from "react";
import {useDispatch} from "react-redux";
import createComment from "../../store/actions/createComment";
import {Button, TextField} from "@material-ui/core";
import classes from './CreateComment.module.css'
interface Props  {
    id:number
}
const CreateComment = (props:Props) => {
    const [content,setContent] = useState('')
    const dispatch = useDispatch()

    const handlePublish = () => {
        dispatch(createComment(content,props.id))
        setContent('')
    }

    return (
        <div className={classes.CreateComment}>
            <TextField
                value={content}
                id="standard-basic"
                variant='outlined'
                label="Add your comment"
                onChange={(e) =>{setContent(e.target.value)}}/>
            <Button
                onClick={handlePublish}
                color='secondary'
                variant='contained'>
                Send
            </Button>
        </div>
    )
}

export default CreateComment
