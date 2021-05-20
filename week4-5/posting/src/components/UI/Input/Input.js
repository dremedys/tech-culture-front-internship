import React from 'react'
import classes from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {

    const inputType = props.type || 'text'
    const cls = [classes.Input]
    const htmlFor = `${inputType}-${Math.random()}`
    const textarea = props.textarea
    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    const inputArea = !textarea ? <input
        style={{height: props.height}}
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        maxLength={props.maxLength}
    /> : <textarea
        style={{
            height: props.height,
            width: '100%'
        }}
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}>
        maxLength={props.maxLength}

    </textarea>

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            {inputArea}

            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Введите верное значение'}</span>
                    : null
            }
        </div>
    )
}

export default Input
