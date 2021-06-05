import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {BASE_URL} from "../../axios/axios";
import {Avatar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {editProfile} from "../../store/actions/profile";
import './ModalEditProfile.css'
import {RootState} from "../../store/reducers/rootReducer";
import Spinner from "../Spinner/Spinner";
import {Alert} from "@material-ui/lab";

export default function ModalEditProfile(props:any) {

    const [description, setDescription] = useState(props.profile.description)
    const [avatar,setAvatar] = useState<string | null>(null);
    const [avatarURL,setAvatarURL] = useState(BASE_URL+props.profile.avatar)

    const dispatch = useDispatch()
    const loading = useSelector( ( (state: RootState) => state.profile.profileEditLoading))
    const error = useSelector( ( (state: RootState) => state.profile.profileEditError))
    const success = useSelector( ( (state: RootState) => state.profile.profileEditSuccess))

    const handleImageChange = (e: any) => {
        const file =e.target.files[0]
        setAvatar(file)
        setAvatarURL(URL.createObjectURL(file))
    }
    const handleSubmit = () => {
        dispatch(editProfile(props.profile.user.id, description,avatar))
    }
    const valid = () => {
        return (!!description) && (props.profile.description !== description || BASE_URL+props.profile.avatar !== avatarURL)
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
                <DialogContent>
                    <Avatar
                        src={avatarURL}
                        style={{ width:'80px',
                            height:'80px'}}
                    >
                    </Avatar>
                    <div className="avatarChangeInput">
                        <div className="form-group">
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="input-file"
                                onChange={handleImageChange}
                                accept='image/png, image/jpeg'/>
                            <label htmlFor="file" className="btn btn-tertiary js-labelFile">
                                <span className="js-fileName">New avatar</span>
                            </label>
                        </div>

                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Change description"
                        value={description}
                        onChange={(e) =>{setDescription(e.target.value)}}
                        fullWidth
                        error={!!description && (description.length > 300)}
                        helperText={'Max length is 300 symbols.'}
                    />
                    {loading? <Spinner/>:null}
                    {error?
                        <Alert
                        severity='error'
                            >Errors has occurred...
                        </Alert>
                        :null}
                    {success?
                        <Alert
                            severity='success'
                            >Successfully added
                        </Alert>
                        :null}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                        color='secondary'
                        disabled={!valid()}
                    >Send
                    </Button>
                    <Button
                        onClick={props.handleClose}
                        color="primary"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
