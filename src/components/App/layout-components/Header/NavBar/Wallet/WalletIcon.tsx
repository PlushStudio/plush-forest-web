import React, { FC, useEffect, useState } from 'react'
import s from './WalletIcon.module.scss'
import walletFaceIcon from '@/assets/images/wallet/32-px-1-outlined-child-generic.svg'
import walletErrorIcon from '@/assets/images/wallet/32-px-1-outlined-alert-big.png'
import noAccountIcon from '@/assets/images/wallet/32-px-1-outlined-skull.png'
import { Gender } from '@/types/Gender'

const VITE_NETWORK_ID = window.config.NETWORK_ID ?? '80001'

const WalletIcon: FC<{ gender: Gender, currentChain: string }> =
  ({ gender, currentChain }) => {

    const [icon, setIcon] = useState(walletFaceIcon)
    const [gradient, setGradient] = useState(s.errorGradient)

    useEffect(() => {
      if (gender && currentChain === VITE_NETWORK_ID) {
        setIcon(walletFaceIcon)
        gender === 'MALE' ? setGradient(s.maleGradient) : setGradient(s.femaleGradient)
      }
      if (!gender) {
        setIcon(noAccountIcon)
        setGradient(s.darkGradient)
      }
      if (currentChain !== VITE_NETWORK_ID) {
        setIcon(walletErrorIcon)
        setGradient(s.errorGradient)
      }
    }, [gender, currentChain])

    return (
      <div className={s.iconContainer}>
        <div className={`${s.icon} ${gradient}`}>
          <span className={s.content}>
            <img alt={'wallet icon'} src={icon} />
          </span>
        </div>
        <div className={`${s.iconStatus} ${currentChain !== VITE_NETWORK_ID ?
          s.iconError :
          s.iconSuccess}
          `} />
      </div>
    )
  }

export default WalletIcon
