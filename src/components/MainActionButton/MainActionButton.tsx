import React, { MouseEvent } from 'react'
import s from './MainActionButton.module.scss'
import arrowIcon from '@/assets/images/outlinedIcons/outlined-arrow-right.svg'
import treeIcon from '@/assets/images/outlinedIcons/outlined-tree-white.png'
import { Spinner } from 'react-bootstrap'
import classNames from 'classnames'

interface IGetStartedBtn {
  text: string
  variant?: 'small' | ''
  image?: 'tree' | 'next'
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  loading?: boolean,
  disabled?: boolean
  className?: string
}

export const MainActionButton = ({
  variant = '',
  text,
  loading,
  onClick,
  image,
  disabled,
  className
}: IGetStartedBtn) => {
  const MainActionButtonContainerStyle = classNames(s.container, s[variant], className)
  const buttonStyle = classNames(s.btnPrimary, { [s.disabled]: disabled })

  return (
    <div className={MainActionButtonContainerStyle}>
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
