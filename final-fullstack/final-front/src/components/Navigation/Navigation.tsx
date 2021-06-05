import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {logout} from "../../store/actions/auth";
import Button from "@material-ui/core/Button";
import ModalAuth from "../ModalAuth/ModalAuth";

function a11yProps(index:number) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

export default function Navigation() {

    const isLogged = useSelector( ( (state: RootState) => state.auth.isLogged))
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);

    const [value, setValue] = React.useState(0);

    // function to change tabs
    const handleChange = (event:any, newValue:number) => {
        setValue(newValue);
    };

    const handleLogout = () => {
        dispatch(logout())
    }

    const AuthButton = () =>  (
        <Button
            color="inherit"
            onClick={(e) => {
                e.preventDefault()
                setOpen(true)
        }}>
            Authorization
        </Button>
    )

    const LogoutButton = () => (
        <div>
            <Tab label="Log out"
                 onClick={handleLogout}
                 {...a11yProps(3)}/>
        </div>
    )

    return (
        <div>
            <AppBar position="static">
                <Tabs
                    variant="standard"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                >
                    <Tab component={NavLink}
                         label="FEED"
                         to="/"
                         {...a11yProps(0)} />
                    <Tab
                        component={NavLink}
                        disabled={!isLogged}
                        label="CREATE A POST"
                        to="/create_post"
                        {...a11yProps(1)} />
                    <Tab
                        disabled={!isLogged}
                        component={NavLink}
                        label="My page"
                        to={'/users/'+localStorage.getItem('user_id')}
                        {...a11yProps(2)} />
                    {!isLogged ? <AuthButton/> : <LogoutButton/>}
                </Tabs>
                {!isLogged?
                    <ModalAuth setOpen={(type:boolean) => {setOpen(type)}} open={open}/>
                    : null}
            </AppBar>
        </div>
    );
}
