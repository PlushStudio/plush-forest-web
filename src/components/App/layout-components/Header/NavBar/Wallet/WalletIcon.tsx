import React, { FC } from 'react'
import s from './WalletIcon.module.scss'
import walletFaceIcon from '@/assets/images/wallet/32-px-1-outlined-child-generic.png'
import walletErrorIcon from '@/assets/images/wallet/32-px-1-outlined-alert-big.png'
import { Gender } from '@/types/Gender'

const WalletIcon: FC<{ gender: Gender }> = ({ gender }) => {
  return (
    <div className={s.iconContainer}>
      <div className={`${s.icon} ${
        gender ?
          s.maleGradient :
          s.femaleGradient}
          `}>
        <span className={s.content}>
           <img alt={'wallet icon'} src={gender ?
             walletFaceIcon : walletErrorIcon}
           />
        </span>
      </div>
      <div className={`${s.iconStatus} ${
        gender === null ?
          s.iconError :
          s.iconSuccess}
          `} />
    </div>
  )
}

export default WalletIcon
