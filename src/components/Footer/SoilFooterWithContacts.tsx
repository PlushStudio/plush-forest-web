import React, { FC } from 'react'
import s from '@/components/Footer/SoilFooterWithContacts.module.scss'
import bitmapPlant from '@/assets/images/plantOnSoil/plant-on-soil.png'
import plushLogo from '@/assets/images/footerLogo/footerLogo@2x.png'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

export const SoilFooterWithContacts: FC = () => {
  const { t } = useTranslation()
  const PLUSH_LINK = window.config.PLUSH_WEBSITE_URL ?? import.meta.env.VITE_PLUSH_WEBSITE_URL
  const handleFooterLink = () => {
    window.open(PLUSH_LINK, '_blank')
  }
  return (
    <div className={classNames(s.soilFooterWithContactsContainer)}>
      <div className={s.soilFooterContent}>
        <div role={'presentation'}
             onClick={handleFooterLink}
             className={classNames('container', s.leftPull)}>
          <img className={s.logoIcon} src={plushLogo} alt={'logo plush'} />
          <div className={classNames(s.leftPullText)}>{t('Footer.logoTitle')}</div>
        </div>
        <img
          className={`unselectable ${s.footerPlant}`}
          src={bitmapPlant}
          alt={'plant'}
        />
      </div>
    </div>
  )
}
