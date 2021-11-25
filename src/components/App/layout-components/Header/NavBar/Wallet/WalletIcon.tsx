import React, { FC } from 'react'
import s from './WalletIcon.module.scss'
import walletFaceIcon from '@/assets/images/wallet/32-px-1-outlined-child-generic.png'
import walletErrorIcon from '@/assets/images/wallet/32-px-1-outlined-alert-big.png'
import { Gender } from '@/types/Gender'

const WalletIcon: FC<{ gender: Gender, currentChain: string }> = ({ gender, currentChain }) => {
  return (
    <div className={s.iconContainer}>
      <div className={`${s.icon} ${
        currentChain !== '4' ? s.errorGradient :
        gender === 'MALE' ?
          s.maleGradient :
          s.femaleGradient}
          `}>
        <span className={s.content}>
           <img alt={'wallet icon'} src={gender && currentChain === '4' ?
             walletFaceIcon : walletErrorIcon}
           />
        </span>
      </div>
      <div className={`${s.iconStatus} ${
        currentChain !== '4' ?
          s.iconError :
          s.iconSuccess}
          `} />
    </div>
  )
}

export default WalletIcon
