import React, {useState} from "react";
import {useDispatch} from "react-redux";
import Input from "../../components/UI/Input/Input";
import moment from "moment";
import Button from "../../components/UI/Button/Button";
import {createPost} from "../../store/actions/createPost";
import classes from './CreatePost.module.css'
import Uploader from "../../components/Uploader/Uploader";

const CreatePost = () => {
    const [image_url, setImageUrl] = useState('')
    const [isFormValid, setFormValid] = useState(false)
    const [formControls,setFormControls] = useState({
        title:
        {
            value: '',
                label: 'Title',
            touched: false,
            errorMessage:'Enter correct title. Length must be less than 90 and not empty.',
            validation: {
            required: true,
                maxLength: 90
        },
            height: 30,
                textarea: false
        },
        body:
        {
            value: '',
                label: 'Content',
            touched: false,
            errorMessage: 'Enter correct content.Length must be less than 250 and not empty.',
            validation: {
            required: true,
                maxLength: 250
        },
            height: 100,
                textarea: true
        }
    })
    const dispatch = useDispatch()

    function validateControl(value, validation){
        if(!validation)
            return true

        let isValid = true

        if(validation.required)
            isValid = value.trim() !== '' && isValid
        if(validation.maxLength){
            isValid = value.length <= validation.maxLength && isValid
        }
        return isValid
    }
    const onChangeHandler = (event, controlName) => {
        const formControls_ = { ...formControls }
        const control = { ...formControls_[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = validateControl(control.value, control.validation)

        formControls_[controlName] = control

        let isFormValid = true

        Object.keys(formControls_).forEach(name => {
            isFormValid = formControls_[name].valid && isFormValid
        })

        setFormControls(formControls_)
        setFormValid(isFormValid)
    }

    function renderInputs() {
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName]
            return (
                <Input
                    maxLength = {control.validation.maxLength}
                    textarea = {control.textarea}
                    height = {control.height}
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => onChangeHandler(event, controlName)}

                />
            )
        })
    }
    const clearInputs = () => {
        let formControls_ = JSON.parse(JSON.stringify(formControls))
        formControls_.title.value = ''
        formControls_.body.value = ''
        setFormControls(formControls_)
    }

    const addPostHandler = event => {
        event.preventDefault()
        const title =formControls.title.value
        const body = formControls.body.value
        const created_at = moment().format()
        const postItem = {
            title, body , comments_count: 0, created_at, image_url
        }
        dispatch(createPost(postItem))
        clearInputs()
    }

        return (
            <div className={classes.CreatePost}>
                <h4>Create a post</h4>
                {renderInputs()}
                <Uploader setUrl = {(url) => setImageUrl(url)}/>
                <hr/>
                <Button
                    type="primary"
                    onClick={addPostHandler}
                    disabled={!isFormValid}
                >
                    Publish
                </Button>
            </div>
        )

}

export default (CreatePost)
