import React, {useState} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {useDispatch} from "react-redux";
import {createComment} from "../../store/actions/createComment";
import moment from "moment";
import {fetchCommentsByPostId, fetchPostById} from "../../store/actions/post";

const CreateComment = (props) => {
    const dispatch = useDispatch()
    const [isFormValid, setFormValid] = useState(false)
    const [formControls, setFormsControls] = useState({
        content:
            {
                value: '',
                label: 'Content',
                touched: false,
                errorMessage:'Enter correct content. Length must be less than 250 and not empty.',
                validation: {
                    required: true,
                    maxLength: 250
                }
            },
    })

    function validateControl(value, validation){
        if(!validation)
            return true

        let isValid = true

        if(validation.required)
            isValid = value.trim()!=='' && isValid
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

        setFormsControls(formControls_)
        setFormValid(isFormValid)
    }
    function cleanInput(){
        let formControls_ = JSON.parse(JSON.stringify(formControls))
        formControls_.content.value = ''
        setFormsControls(formControls_)
    }
    function renderInputs() {
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName]
            return (
                <Input
                    textarea = {false}
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

    const addCommentHandler = event => {
        event.preventDefault()
        const content = formControls.content.value
        const created_at = moment().format()
        const commentItem = {
            content ,
            likes: 0,
            created_at,
            post_id: props.id
        }
        dispatch(createComment(commentItem))
        cleanInput()
    }

    return (
        <div>
            {renderInputs()}
            <Button
                type="primary"
                onClick={addCommentHandler}
                disabled={!isFormValid}
            >
                Post comment
            </Button>
        </div>
    )

}

export default CreateComment
