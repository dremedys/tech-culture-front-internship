import React, {useState} from 'react';
import {reset} from "../../store/actions/auth";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Login from "../Login/Login";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import Register from "../Register/Register";

type Props = {
    setOpen:(type:boolean) =>void,
    open:boolean
}

const ModalAuth = (props:Props) => {

    const dispatch = useDispatch()
    const [openLogin, setOpenLogin] = useState(true)

    const handleClose = () => {
        props.setOpen(false)
        dispatch(reset())
    };
    function goToLogin(){
        setOpenLogin(true)
        dispatch(reset());
    }
    function goToRegister(){
        setOpenLogin(false)
        dispatch(reset());
    }
    return (
        <Dialog
            scroll = "body"
            open={props.open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            style={{marginTop:0}}
        >

            <DialogTitle id="form-dialog-title">Authorization</DialogTitle>
            <DialogContent>
                <div>
                    {openLogin?<Login goToRegister={goToRegister}></Login>:
                    <Register goToLogin={goToLogin}></Register>}
                </div>

            </DialogContent>
            <DialogActions
            >
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ModalAuth
