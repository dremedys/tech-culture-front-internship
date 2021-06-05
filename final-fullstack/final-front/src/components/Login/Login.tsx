import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, reset} from "../../store/actions/auth";
import {RootState} from "../../store/reducers/rootReducer";
import {Button, TextField} from "@material-ui/core";
import Spinner from "../Spinner/Spinner";
import classes from './Login.module.css'
import {Alert} from "@material-ui/lab";

type Props = {
    goToRegister:React.MouseEventHandler<HTMLButtonElement>
}

const Login = (props:Props) => {
    const dispatch = useDispatch()
    const loading = useSelector( ( (state: RootState) => state.auth.loading))
    const error = useSelector( ( (state: RootState) => state.auth.error))
    const errorMessage = useSelector( ( (state: RootState) => state.auth.errorMessage))

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        dispatch(login(username,password))
    }
    const elementStyles = {
        display: 'block',
        marginBottom: 15,
        width: '80%'
    }
    return (
        <div className={classes.Login}>
            <TextField
                style={elementStyles}
                onChange={event => setUsername(event.target.value) }
                placeholder='username'/>
            <br/>
            <TextField
                style={elementStyles}
                onChange={event => setPassword(event.target.value) }
                placeholder='password'
                type='password'
            />
            <br/>
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                style={elementStyles}
            >
                Sign in
            </Button>
            <div style={{
                display:'flex'
            }}>
                <p style={{
                    fontSize:14,
                    color:'silver'
                }}>Do not have an account?</p>
                <Button onClick={(e) => {props.goToRegister(e)}}>Go to register</Button>
            </div>

            {error? <Alert severity="error">
                <h4
                    style={{margin:0}}
                >{errorMessage}</h4>
                </Alert>

                : null}
            {loading? <Spinner/>: null}
        </div>
    )
}


export default Login
