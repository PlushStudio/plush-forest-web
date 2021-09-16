import React, { FC } from 'react'
import s from '@/components/App/layout-components/SoilFooterWithContacts.module.scss'
import bitmapPlant from '@/assets/images/bitmap-plant.png'
import twitterIcon from '@/assets/images/atom-icon-social-twitter.svg'
import discordIcon from '@/assets/images/atom-icon-social-discord.svg'
import plushLogo from '@/assets/images/combined-shape.svg'
import {Link} from "react-router-dom";

export const SoilFooterWithContacts: FC = () => {

  return (
    <div className={s.soilFooterWithContactsContainer}>
      <div className={s.soilFooterContent}>
        <div className={s.leftPull}>
          <Link to={""}><img src={plushLogo} alt={'logo plush'} /></Link>
          <div className={s.leftPullText}>
            Crafted by <span className={s.leftPullTextPrimary}>Plush</span>
          </div>
        </div>
        <div className={s.rightPull}>
          <div className={s.socialItem}>
            <img src={twitterIcon} alt={'twitter'} />
          </div>
          <div className={s.socialItem}>
            <img src={discordIcon} alt={'discord'} />
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