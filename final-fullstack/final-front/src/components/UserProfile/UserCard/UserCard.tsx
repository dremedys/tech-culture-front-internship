import React, {CSSProperties} from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {IProfile} from "../../../shared/models/models";
import {Avatar, makeStyles} from "@material-ui/core";
import {BASE_URL} from "../../../axios/axios";
import ModalEditProfile from "../../ModalEditProfile/ModalEditProfile";
import Button from "@material-ui/core/Button";
import {resetEditProfile} from "../../../store/actions/profile";
import {useDispatch} from "react-redux";
const useStyles = makeStyles({
    root: {
        width: 375,
        margin:'0 auto',
        marginTop:30
    }
});

interface myProps{
    profile: IProfile,
    profileError: boolean
}
const UserCard = (props:myProps) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const description = props.profile?.description || 'No data provided'
    const username = props.profile?.user.username|| 'No data provided'

    const avatarStyles: CSSProperties = {
        position: 'absolute',
        top:'30px',
        width:'50px',
        height:'50px'
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        dispatch(resetEditProfile())
    };

    if(!props.profileError && props.profile)
        return (
            <Card className={classes.root}>
                <CardContent style={{position:'relative'}}>
                    {props.profile.user.id == localStorage.getItem('user_id')?
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleClickOpen}
                            size='small'>
                            Edit the profile
                        </Button>
                        :null}
                    <h3>User @{username}</h3>
                   <Avatar
                        style={avatarStyles}
                        src={BASE_URL+props.profile.avatar}
                   >
                   </Avatar>
                    About: {description}
                </CardContent>
                <ModalEditProfile profile={props.profile} handleClose={handleClose} open={open}/>
            </Card>

        )

    else {
        return (
            <h2>This user does not have a profile card.</h2>
        )
    }
}

export default UserCard
