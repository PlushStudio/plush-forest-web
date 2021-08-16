import React, { FC } from 'react'
import s from '@/assets/styles/layout/SoilFooterWithContacts.module.scss'
import bitmapPlant from '@/assets/images/bitmap-plant.png'
import twitterIcon from '@/assets/images/atom-icon-social-twitter.svg'
import discordIcon from '@/assets/images/atom-icon-social-discord.svg'
import plushLogo from '@/assets/images/combined-shape.svg'

export const SoilFooterWithContacts: FC = () => {

  return (
    <div className={s.soilFooterWithContactsContainer}>
      <div className={s.soilFooterContent}>
        <div className={s.leftPull}>
          <img src={plushLogo} alt={'logo plush'} />
          <div className={s.leftPullText}>
            Crafted by <span className={s.leftPullTextPrimary}>Plush</span>
          </div>
        </div>
        <div className={s.rightPull}>
          <div className={s.socialItem}>
            <img src={twitterIcon} alt={'plant'} />
          </div>
          <div className={s.socialItem}>
            <img src={discordIcon} alt={'plant'} />
          </div>
          <div className={s.termsAndPrivacy}>
            Terms - Privacy
          </div>
        </div>
        <img className={`unselectable ${s.footerPlant}`} src={bitmapPlant} alt={'plant'} />
      </div>
    </div>
  )
}