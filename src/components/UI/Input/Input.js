import React from 'react'
import classes from "./Input.module.css";

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}

function Input(props) {
    const inputType = props.type || 'text';
    const cls = [
        classes.Input
    ];
    const inputId = `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        cls.push(classes.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={inputId}>{ props.label }</label>
            <input 
                id={inputId}
                type={inputType} 
                className={cls.join(' ')} 
                value={props.value}
                onChange={props.onChange}
            />

            { 
                isInvalid(props) 
                ? <span> {props.errorMessage || 'Введите верное значение'}</span>
                : null
            }
            
        </div>
    )
}

export default Input
