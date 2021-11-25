import React, { FC } from 'react'
import s from './WalletModal.module.scss'
import successConnectionLine from '@/assets/images/wallet/32-px-1-outlined-link-01@2x.png'
import badConnectionLine from '@/assets/images/wallet/32-px-1-outlined-bad-connection-01@2x.png'
import metamaskIcon from '@/assets/images/wallet/group-59@2x.png'
import rinkebyIcon from '@/assets/images/wallet/group-43@2x.png'
import copyAddressIcon from '@/assets/images/wallet/24-px-1-outlined-copy@2x.png'
import { cutWalletPublicId } from '@/utils'

const WalletModal: FC<{ isVisible: boolean, address: string, type: string }> = ({ isVisible, address, type }) => {
  return (
    isVisible ?
      <div className={`${s.modalContainer} ${type === 'networkError' ? s.errorModalContainer : ''}`}>
        <div className={s.modalContent}>
          {type === 'networkError' &&
          <div className={s.modalTitle}>
            Wrong network detected
          </div>}
          <div className={`${s.connectionBlock} ${type === 'networkError' ? s.errorConnectionBlock : ''}`}>
            <div className={`${s.connectionCircle}`}>
              <img alt={'metamask icon'}
                   className={s.connectionImage}
                   src={metamaskIcon} />
            </div>
            <div className={s.connectionImage}>
              <img alt={'connection line'}
                   className={s.connectionImage}
                   src={type !== 'networkError' ? successConnectionLine : badConnectionLine} />
            </div>
            <div className={s.connectionCircle}>
              <img alt={'rinkeby icon'}
                   className={s.connectionImage}
                   src={rinkebyIcon} />
            </div>
          </div>
          {type !== 'networkError' &&
          <div className={s.addressInfoBlock}>
            <div className={s.addressBlock}>
            <span className={s.address}>
              {cutWalletPublicId(address)}
            </span>
              <img alt={'copy address icon'}
                   className={s.copyAddressIcon}
                   src={copyAddressIcon} />
            </div>
            <div className={s.addressBlockBottom}>
              View on Explorer
            </div>
          </div>}
        </div>
        <div className={`${s.modalFooter} ${type === 'networkError' ? s.modalErrorFooter : ''}`}>
          {type !== 'networkError' ?
            `You can disconnect your metamask account in the metamask extension.` :
            `Please switch to Rinkeby Network in your wallet and try again.`}
        </div>
      </div> : null
  )
}

export default WalletModal
