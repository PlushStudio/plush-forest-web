import React from 'react'
import s from '@/components/Header/HeaderContent.module.scss'
import treeIcon from '@/assets/images/logo/plush-logo.svg'
import { Link, useLocation, useParams } from 'react-router-dom'
import TaglineIcon from '@/assets/images/plushForestTagline/plush-forest-tagline.svg'
import { useTranslation } from 'react-i18next'

interface Params {
  currentLocation: string
  id: string
}

export const HeaderContent: () => JSX.Element = () => {
  const params: Params = useParams()
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <div className={s.headerContainer}>
      <Link className={pathname.startsWith('/token/') ? s.disabledLink : ''} to={'/'}>
        <img className={s.treeIcon} src={treeIcon} alt="tree icon" />
      </Link>
      <div className={!params.id ? s.contentBlock : s.invisible}>
        <span className={s.logoTitle}>{t('Header.logoTitle')}</span>
        <img className={s.tagline} src={TaglineIcon} alt="forest tagline" />
      </div>
    </div>
  )
}
