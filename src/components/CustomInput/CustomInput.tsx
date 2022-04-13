import React from 'react'
import s from './CustomInput.module.scss'
import classnames from 'classnames'

interface ICustomInput {
  type: string
  placeholder?: string
  readonly?: boolean
  onChange: any
  value: string
  input: React.RefObject<HTMLInputElement>
  status?: 'error' | 'isTyping' | '',
  message?: string
}

export const CustomInput = ({
  type,
  placeholder,
  readonly,
  onChange,
  value,
  input,
  status = '',
  message
}: ICustomInput) => {
  const style = classnames(s.inputContainer, s[status], { [s.hidden]: !value })

  const handlerOnClick = () => {
    input?.current?.focus()
  }

  return (
    <>
      <div aria-hidden onClick={handlerOnClick} className={style}>
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
      {message && <p className={s.inputMessage}>{message}</p>}
    </>

  )
}
