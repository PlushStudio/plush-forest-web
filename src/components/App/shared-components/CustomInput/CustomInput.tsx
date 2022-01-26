import React, { useEffect, useRef } from 'react'
import s from './CustomInput.module.scss'
import classnames from 'classnames'

interface ICustomInput {
  type: string
  placeholder?: string
  readonly?: boolean
  onChange: any
  value: string
  input: React.RefObject<HTMLInputElement>
  status?: 'error' | 'isTyping' | ''
}

export const CustomInput = ({
  type,
  placeholder,
  readonly,
  onChange,
  value,
  input,
  status = '',
}: ICustomInput) => {
  const style = classnames(s.inputContainer, s[status], { [s.hidden]: !value })

  const handlerOnClick = () => {
    input?.current?.focus()
  }

  return (
    <div onClick={handlerOnClick} className={style}>
      <p className={s.nameText}>{placeholder}</p>
      <input
        ref={input}
        onChange={onChange}
        value={value}
        className={s.customInput}
        type={type}
        placeholder={placeholder}
        readOnly={readonly}
      />
    </div>
  )
}
