import React, { FC } from 'react'
import s from '@/components/Footer/SoilFooterWithContacts.module.scss'
import bitmapPlant from '@/assets/images/bitmap-plant.png'
import plushLogo from '@/assets/images/footer-logo.png'
import { Link } from 'react-router-dom'

export const SoilFooterWithContacts: FC = () => {

  const PLUSH_LINK = window.config.PLUSH_WEBSITE_URL ?? import.meta.env.VITE_PLUSH_WEBSITE_URL

  const handleFooterLink = () => {
    window.open(PLUSH_LINK, '_blank');
  }
  return (
    <div className={s.soilFooterWithContactsContainer}>
      <div className={s.soilFooterContent}>
        <div onClick={handleFooterLink} className={s.leftPull}>
          <Link to={''}>
            <img src={plushLogo} alt={'logo plush'} />
          </Link>
          <div className={s.leftPullText}>Plush Family</div>
        </div>
        <div className={s.rightPull}>
          <div className={s.termsAndPrivacy}>Privacy | Terms</div>
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
