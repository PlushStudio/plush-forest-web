import React from 'react'
import s from '@/components/App/layout-components/Header/HeaderContent.module.scss'
import treeIcon from '@/assets/images/plush-logo.svg'
import { Link, useLocation, useParams } from 'react-router-dom'
import Logo from '@/assets/images/plush-forest-tagline.svg'

interface Params {
  currentLocation: string
  id: string
}

export const HeaderContent: () => JSX.Element = () => {
  const params: Params = useParams()
  const { pathname } = useLocation()
  return (
    <div className={s.headerContainer}>
      <Link className={pathname.startsWith('/token/') ? s.disabledLink : ''} to={'/'}>
        <img className={s.treeIcon} src={treeIcon} alt="tree icon" />
      </Link>
      <div className={`${!params.id ? s.contentBlock : s.invisible}`}>
        <span className={s.logoTitle}>Plush Forest</span>
        <img src={Logo} alt="" />
      </div>
    </div>
  )
}
