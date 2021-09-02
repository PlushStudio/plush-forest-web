import React from 'react'
import s from './CustomInput.module.scss'
import {Form} from "react-bootstrap";

interface ICustomInput {
    as: any,
    type: string,
    placeholder?: string,
    readonly?: boolean,
    className?: string
}

export const CustomInput = ({as, type, placeholder, readonly, className}: ICustomInput) => {
    return (
        <div>
            <Form.Control className={`${className} + ${s.customInput}`} as={as} type={type} placeholder={placeholder}
                          readOnly={readonly}/>
        </div>
    )
}