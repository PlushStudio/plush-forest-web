import React, { FC } from 'react'
import s from '@/components/Footer/SoilFooterWithContacts.module.scss'
import bitmapPlant from '@/assets/images/bitmap-plant.png'
import plushLogo from '@/assets/images/footerLogo/footerLogo@2x.png'

export const SoilFooterWithContacts: FC = () => {
  const PLUSH_LINK = window.config.PLUSH_WEBSITE_URL ?? import.meta.env.VITE_PLUSH_WEBSITE_URL
  const handleFooterLink = () => {
    window.open(PLUSH_LINK, '_blank')
  }
  return (
    <div className={s.soilFooterWithContactsContainer}>
      <div className={s.soilFooterContent}>
        <div role={'presentation'}
          onClick={handleFooterLink}
          className={s.leftPull}>
            <img className={s.logoIcon} src={plushLogo} alt={'logo plush'} />
          <div className={s.leftPullText}>Plush Family</div>
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
