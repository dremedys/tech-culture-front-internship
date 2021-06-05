import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {register, reset} from "../../store/actions/auth";
import {RootState} from "../../store/reducers/rootReducer";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Spinner from "../Spinner/Spinner";
import {Alert} from "@material-ui/lab";

type Props = {
    goToLogin:React.MouseEventHandler<HTMLButtonElement>
}

const Register = (props:Props) => {
    const dispatch = useDispatch()
    const loading = useSelector( ( (state: RootState) => state.auth.loading))
    const error = useSelector( ( (state: RootState) => state.auth.error))
    const errorMessage = useSelector( ( (state: RootState) => state.auth.errorMessage))
    const success = useSelector( ( (state: RootState) => state.auth.success))
    const [image, setImage] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordSecond, setPasswordSecond] = useState('')
    const [description, setDescription] = useState('')

    const handleRegister = () => {
        dispatch(register(username,password,description,image))
        setUsername('')
        setPasswordSecond('')
        setPassword('')
        setDescription('')
    }
    const handleImageChange = (e: any) => {
        setImage(e.target.files[0])
    };
    const handlePassword = (password: string) => {
        setPassword(password)
    }
    const handleSecondPassword = (password: string) => {
        setPasswordSecond(password)
    }

    const passwordsSame = () => {
        return password === passwordSecond
    }
    const isValid = () => {
        return password && passwordsSame()
    }
    const elementStyles = {
        display: 'block',
        margin:'0 auto',
    }

    return (
        <div style={{margin:0,padding:0}}>
            <div style={{
                display:'flex'
            }}>
                <p style={{
                    fontSize:14,
                    color:'silver'
                }}>Already have an account?</p>
                <Button onClick={(e) => {props.goToLogin(e);}}
                >Go to login</Button>
            </div>
            <TextField
                value={username}
                style={elementStyles}
                variant="outlined"
                size='small'
                onChange={event => setUsername(event.target.value) }
                label='username'/>
            <br/>
            <TextField
                value={password}
                style={elementStyles}
                size='small'
                variant="outlined"
                onChange={event => handlePassword(event.target.value)}
                error={!!password && password.length < 5}
                helperText='Length must be longer than 5.'
                label='password'/>
            <br/>
            <TextField
                value={passwordSecond}
                size='small'
                style={elementStyles}
                variant="outlined"
                onChange={event => handleSecondPassword(event.target.value) }
                label='Confirm password'
                error={!!passwordSecond && !passwordsSame()}
                helperText='Passwords must be same.'
            />
            <br/>
            <TextField
                value={description}
                style={elementStyles}
                multiline
                rows={7}
                variant="outlined"
                onChange={event => setDescription(event.target.value)}
                label='Add some description...'
                error={!!description && description.length > 300}
                helperText={'Max length is 300 symbols.'}
            />
            <br/>
            <label>Add an avatar</label>
            <br/>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"
                   onChange={handleImageChange}
                   />
            <br/>
            <br/>
            {error? <Alert severity="error">
                <p
                    style={{margin:0}}
                >{errorMessage}</p>
            </Alert>:null}
            <Button
                style={elementStyles}
                variant="contained"
                color="primary"
                onClick={handleRegister}
                disabled={!isValid()}>
                Register
            </Button>

            {loading? <Spinner/>: null}

            {success?  <Alert severity="success">
                <p
                    style={{margin:0}}
                >Successfully registered!</p>
            </Alert>:null}

        </div>
    )
}

export default Register
