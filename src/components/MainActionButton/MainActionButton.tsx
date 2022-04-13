import React, { MouseEvent } from 'react'
import s from './MainActionButton.module.scss'
import arrowIcon from '@/assets/images/24-px-1-outlined-arrow-right.svg'
import treeIcon from '@/assets/images/32-px-1-outlined-tree-white.png'
import { Spinner } from 'react-bootstrap'
import classNames from 'classnames'

interface IGetStartedBtn {
  text: string
  variant?: 'small' | ''
  image?: 'tree' | 'next'
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  loading?: boolean,
  disabled?: boolean
}

export const MainActionButton = ({
  variant = '',
  text,
  loading,
  onClick,
  image,
  disabled
}: IGetStartedBtn) => {
  const style = classNames(s.container, s[variant])
  const buttonStyle = classNames(s.btnPrimary, { [s.disabled]: disabled })

  return (
    <div className={style}>
      <button onClick={onClick} className={buttonStyle}>
        {text}

        {loading
          ? <Spinner
            className={s.spinner}
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          : image === 'next'
            ? <img alt="get started arrow" className={s.image} src={arrowIcon} />
            : image === 'tree' &&
            <img alt="get started arrow" className={s.image} src={treeIcon} />
        }
      </button>
    </div>
  )
}
