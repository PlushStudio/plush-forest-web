import React, { MouseEventHandler, useContext } from 'react'
import s from './MainActionButton.module.scss'
import arrowIcon from '@/assets/images/24-px-1-outlined-arrow-right.svg'
import treeIcon from '@/assets/images/32-px-1-outlined-tree-white.png'
import { Link } from 'react-router-dom'
import { Button, Spinner } from 'react-bootstrap'
import { userDetailsContext } from '@/context/UserDetailsProvider'

interface IGetStartedBtn {
  text: string,
  variant?: string,
  image?: 'tree' | 'next',
  onClick?: MouseEventHandler<HTMLElement>,
  loading?: boolean
}

export const MainActionButton = ({ text, loading, onClick, image }: IGetStartedBtn) => {
  const [userDetails] = useContext(userDetailsContext)

  return (
    <div className={s.container}>
      {
        userDetails.name === '' ? <Button onClick={onClick} className={s.btnPrimary}>
          {text}
          {image === 'next' && <img alt='get started arrow' className={s.image} src={arrowIcon} />}
          {image === 'tree' && <img alt='get started arrow' className={s.image} src={treeIcon} />}
          {loading && <Spinner
            as='span'
            animation='grow'
            size='sm'
            role='status'
            aria-hidden='true'
          />}
        </Button> :
          <Link style={{ textDecoration: 'none' }} to={'/planting'}>
            <Button onClick={onClick} className={s.btnPrimary}>
              {text}
              {image === 'next' && <img alt='get started arrow' className={s.image} src={arrowIcon} />}
              {image === 'tree' && <img alt='get started arrow' className={s.image} src={treeIcon} />}
              {loading && <Spinner
                as='span'
                animation='grow'
                size='sm'
                role='status'
                aria-hidden='true'
              />}
            </Button>
          </Link>
      }
    </div>
  )
}