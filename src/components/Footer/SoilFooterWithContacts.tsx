import React, { FC } from 'react'
import s from '@/components/Footer/SoilFooterWithContacts.module.scss'
import bitmapPlant from '@/assets/images/bitmap-plant.png'
import plushLogo from '@/assets/images/footerLogo/footerLogo@2x.png'
import { Link } from 'react-router-dom'

export const SoilFooterWithContacts: FC = () => {
  return (
    <div className={s.soilFooterWithContactsContainer}>
      <div className={s.soilFooterContent}>
        <div className={s.leftPull}>
          <Link to={''}>
            <img className={s.logoIcon} src={plushLogo} alt={'logo plush'} />
          </Link>
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
