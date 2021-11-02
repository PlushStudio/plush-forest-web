import React from 'react'
import s from './CustomInput.module.scss'
import {Form} from "react-bootstrap";

interface ICustomInput {
    as: any,
    type: string,
    placeholder?: string,
    readonly?: boolean,
    className?: string,
    onChange: any,
    value: string
}

export const CustomInput = ({as, type, placeholder, readonly, className, onChange, value}: ICustomInput) => {
    return (
            <Form.Control onChange={onChange} value={value} className={`${className} + ${s.customInput}`} as={as} type={type} placeholder={placeholder}
                          readOnly={readonly}/>
    )
}