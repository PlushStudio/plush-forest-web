import React, { FC, useContext, useState } from 'react'
import s from './WalletMain.module.scss'
import { cutWalletPublicId } from '@/utils'
import arrowBottomIcon from '@/assets/images/wallet/arrow-bottom.png'

interface WalletMain {
  setModalVisibility: (modalVisibility: boolean) => void,
  modalVisibility: boolean,
  name: string
}

const WalletMain = ({ modalVisibility, setModalVisibility, name }: WalletMain) => {
  return (
    <div onClick={() => setModalVisibility(!modalVisibility)} className={s.mainContainer}>
      <div className={s.topPull}>
        <div className={s.name}>
          Jamie
        </div>
        <div className={s.address}>
          {cutWalletPublicId('0x4c49Dc38c549F888fA8AB7736a98EB118fAB6FE7')}
        </div>
        <div className={s.arrowBottom}>
          <img alt={'arrow-bottom'} src={arrowBottomIcon} />
        </div>
      </div>
      <div className={s.bottomPull}>
        <span className={s.bottomPullText}>Connected to Rinkeby</span>
      </div>
    </div>
  )
}

export default WalletMain
