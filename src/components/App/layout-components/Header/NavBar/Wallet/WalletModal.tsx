import React, { FC } from 'react'
import s from './WalletModal.module.scss'
import connectionLine from '@/assets/images/wallet/32-px-1-outlined-link-01@2x.png'
import metamaskIcon from '@/assets/images/wallet/group-59@2x.png'
import rinkebyIcon from '@/assets/images/wallet/group-43@2x.png'
import copyAddressIcon from '@/assets/images/wallet/24-px-1-outlined-copy@2x.png'
import { cutWalletPublicId } from '@/utils'

const WalletModal: FC<{ isVisible: boolean, address: string }> = ({ isVisible, address }) => {
  return (
    isVisible ?
      <div className={s.modalContainer}>
        <div className={s.modalContent}>
          <div className={s.connectionBlock}>
            <div className={`${s.connectionCircle}`}>
              <img alt={'metamask icon'} className={s.connectionImage} src={metamaskIcon} />
            </div>
            <div className={s.connectionImage}>
              <img alt={'connection line'} className={s.connectionImage} src={connectionLine} />
            </div>
            <div className={s.connectionCircle}>
              <img alt={'rinkeby icon'} className={s.connectionImage} src={rinkebyIcon} />
            </div>
          </div>
          <div className={s.addressInfoBlock}>
            <div className={s.addressBlock}>
            <span className={s.address}>
              {cutWalletPublicId(address)}
            </span>
              <img alt={'copy address icon'} className={s.copyAddressIcon} src={copyAddressIcon} />
            </div>
            <div className={s.addressBlockBottom}>
              View on Explorer
            </div>
          </div>
        </div>
        <div className={s.modalFooter}>
          You can disconnect your metamask account in the metamask extension.
        </div>
      </div> : null
  )
}

export default WalletModal
