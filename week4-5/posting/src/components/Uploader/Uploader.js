import React, {useState} from "react";
import {storage} from "../../firebase";
import Button from "../UI/Button/Button";
import classes from './Uploader.css'
const Uploader = props => {
    const  [image,setImage] = useState(null)
    const [imageAdded, setAdded] = useState(false)

    const handle = e => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
            setAdded(true)
        }
    }

    const handleUpload = () => {
        const uploadTask =storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(urli => {
                        props.setUrl(urli)
                    });
            }
        );
    }

    return (
        <div className={classes.Uploader}>
            <h3>Add image</h3>
            <input   type='file' onChange={handle}/>
            <label>Please click this to add image </label>
            <Button disabled={!imageAdded} type={'image-sender'} onClick={handleUpload}>Add image</Button>
        </div>
    )
}
export default Uploader
