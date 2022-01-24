import React, { FC, useEffect, useState } from 'react'
import s from './WalletIcon.module.scss'
import walletFaceIcon from '@/assets/images/wallet/32-px-1-outlined-child-generic.svg'
import walletErrorIcon from '@/assets/images/wallet/32-px-1-outlined-alert-big.png'
import noAccountIcon from '@/assets/images/wallet/32-px-1-outlined-skull.png'
import { Gender } from '@/types/Gender'
import { checkWrongNetwork } from "@/utils/utils";

const VITE_NETWORK_ID = window.config.NETWORK_ID ?? '80001'

const WalletIcon: FC<{ gender: Gender, networkId: string }> =
  ({ gender, networkId }) => {

    const [state, setState] = useState({
      icon: walletFaceIcon,
      gradient: s.errorGradient,
      status: 'success'
    })

    useEffect(() => {
      const isWrongNetwork = checkWrongNetwork(VITE_NETWORK_ID, networkId)
      if (gender && !isWrongNetwork) {
        setState({
          icon: walletFaceIcon,
          gradient: gender === 'MALE' ? s.maleGradient : s.femaleGradient,
          status: 'success'
        })
      }
      if (!gender) {
        setState({
          icon: noAccountIcon,
          gradient: s.darkGradient,
          status: 'error'
        })
      }
      if (isWrongNetwork) {
        setState({
          icon: walletErrorIcon,
          gradient: s.errorGradient,
          status: 'error'
        })
      }
    }, [gender, networkId])

    return (
      <div className={s.iconContainer}>
        <div className={`${s.icon} ${state.gradient}`}>
          <span className={s.content}>
            <img alt={'wallet icon'} src={state.icon} />
          </span>
        </div>
        <div className={`${s.iconStatus} ${state.status === 'error' ? s.iconError : s.iconSuccess}`} />
      </div>
    )
  }

export default WalletIcon
