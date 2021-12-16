import React, { FC, useEffect, useState, useRef } from 'react'
import s from './WalletDropdown.module.scss'
import successConnectionLine from '@/assets/images/wallet/32-px-1-outlined-link-01@2x.png'
import badConnectionLine from '@/assets/images/wallet/32-px-1-outlined-bad-connection-01@2x.png'
import metamaskIcon from '@/assets/images/wallet/group-59@2x.png'
import rinkebyIcon from '@/assets/images/wallet/group-43@2x.png'
import copyAddressIcon from '@/assets/images/wallet/24-px-1-outlined-copy@2x.png'
import { cutWalletPublicId } from '@/utils/utils'
import { WalletDropdownType } from '@/types/wallet/WalletDropdownType'
import { WalletState } from '@/types/wallet/WalletStateType'

const VITE_NETWORK_ID = window.config.NETWORK_ID ?? '0x4'

const WalletDropdown: FC<{
  isVisible: boolean | null | undefined,
  address: string,
  type: WalletDropdownType,
  networkId: string,
  setWalletState: (walletState: WalletState) => void,
  onDropdownRefInitialized: (dropdownRef: React.MutableRefObject<null>) => void }> =
  ({ isVisible,
     address,
     type,
     networkId,
     onDropdownRefInitialized,
     setWalletState}) => {
    const [footerButtonText, setFooterButtonText] = useState('Switch to Rinkeby')
    const [footerSubtext, setFooterSubtext] = useState('Switch to Rinkeby')
    const dropdownRef = useRef(null)

    useEffect(() => {
      if (dropdownRef) {
        onDropdownRefInitialized(dropdownRef)
      }
    }, [dropdownRef])

    useEffect(() => {
      switch (type) {
        case 'SUCCESS':
          setFooterButtonText('Disconnect')
          setFooterSubtext('')
          return
        case 'USER_NOT_FOUND':
          setFooterButtonText('Sign up')
          setFooterSubtext('If you already have a Plush account, try switching between yourMetamask wallets. Otherwise, please visit Plush website to learn more about Plush, and create your account.')
          return
        case 'WRONG_NETWORK':
          setFooterButtonText('Switch to Rinkeby')
          setFooterSubtext('Please switch to Rinkeby Network in your wallet and try again.')
      }
    }, [type])

    const dropdownButtonHandler = async () => {
      if (networkId !== VITE_NETWORK_ID) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: VITE_NETWORK_ID}]
        })
      }
      if (type === 'SUCCESS') {
        setWalletState('DISCONNECTED')
      }
    }
    return (
      <div ref={dropdownRef} className={`${s.modalContainer} ${type === 'WRONG_NETWORK' ? s.errorModalContainer : ''} 
        ${isVisible ? s.dropdownVisible : s.dropdownHidden}`}>
        <div className={s.modalContent}>
          {type !== 'SUCCESS' && <div className={s.modalTitle}>
            {type === 'USER_NOT_FOUND' ? 'Plush account is required' : 'Wrong network detected'}
          </div>
          }
          {type === 'WRONG_NETWORK' && <>
            <div className={`${s.connectionBlock} ${type === 'WRONG_NETWORK' ? s.errorConnectionBlock : ''}`}>
              <div className={`${s.connectionCircle}`}>
                <img alt={'metamask icon'}
                     className={s.connectionImage}
                     src={metamaskIcon} />
              </div>
              <div className={s.connectionImage}>
                <img alt={'connection line'}
                     className={s.connectionImage}
                     src={type !== 'WRONG_NETWORK' ? successConnectionLine : badConnectionLine} />
              </div>
              <div className={s.connectionCircle}>
                <img alt={'rinkeby icon'}
                     className={s.connectionImage}
                     src={rinkebyIcon} />
              </div>
            </div>
          </>}
          {type === 'SUCCESS' &&
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
        <div className={`${s.modalFooter} 
       ${type === 'WRONG_NETWORK' ?
          s.modalFooterWrongNetwork :
          type === 'USER_NOT_FOUND' ? s.modalFooterUserNotFound : ''}`}>
          {type !== 'SUCCESS' &&
            <span className={s.footerSubtext}>{footerSubtext}</span>}
          <div className={s.modalFooterButton}>
            <div onClick={() => dropdownButtonHandler()} className={s.buttonText}>
              {footerButtonText}
            </div>
          </div>
        </div>
      </div>
    )
  }

export default WalletDropdown
