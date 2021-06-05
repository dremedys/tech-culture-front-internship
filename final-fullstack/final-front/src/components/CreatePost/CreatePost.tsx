import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createPost, createPostReset} from "../../store/actions/createPost";
import {RootState} from "../../store/reducers/rootReducer";
import {Button, InputLabel, TextField} from "@material-ui/core";
import classes from './CreatePost.module.css'
import {Alert} from "@material-ui/lab";

const CreatePost = () => {
    const dispatch = useDispatch()
    const message = useSelector( (state: RootState) => state.createPost.message)

    const [title, setTitle] = useState('')
    const [body,setBody] = useState('')
    const [image, setImage] = useState(null)

    useEffect(() => {
        return function cleanup () {
            dispatch(createPostReset())
        }
    }, [dispatch])

    const clearInputs = () => {
        setTitle('')
        setBody('')
        setImage(null)
    }
    const handleImageChange = (e: any) => {
       setImage(e.target.files[0])
    };
    const handleSubmit = () => {
        dispatch(createPost(title,body, image))
        clearInputs()
    }
    const valid = () => {
        return  (title && body && title.length <= 50 && body.length <= 300)
    }

    return (
        <form className={classes.CreatePost} autoComplete='off'>
            <TextField
                value={title}
                id="standard-basic"
                variant='outlined'
                label="Title"
                error={ (!!title && title.length > 50)}
                helperText='Must not be empty or more than 50 symbols.'
                onChange={(e) => {setTitle(e.target.value)}}/>
            <br/>
            <TextField
                value={body}
                variant='filled'
                onChange={(e) => {setBody(e.target.value)}}
                multiline
                rows={5}
                error={(!!body && body.length > 300)}
                helperText='Must not be empty or more than 300 symbols.'
                label='Text' />
            <br/>
            <InputLabel>Add image</InputLabel>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"
                   onChange={handleImageChange}
            />
            <br/>
            <Button
                disabled={!valid()}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}>
               Publish
            </Button>
            {message? <Alert
                severity='info'
                style={{marginTop:20}}
            >{message}</Alert>:null}
        </form>
    )
}
export default CreatePost
