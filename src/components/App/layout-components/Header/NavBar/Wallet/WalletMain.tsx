import React, { useEffect, useRef } from 'react'
import s from './WalletMain.module.scss'
import { cutWalletPublicId } from '@/utils/utils'
import arrowBottomIcon from '@/assets/images/wallet/arrow-bottom.svg'

interface WalletMain {
  setManualModalVisibility?: (modalVisibility: boolean | null | undefined) => void | undefined,
  name: string,
  address: string,
  dropdownRef: React.MutableRefObject<null>
}

const WalletMain = ({ setManualModalVisibility, name, address, dropdownRef }: WalletMain) => {
  const walletMainRef = useRef(null)
  useEffect(() => {
    /**
     * Set dropdown state if clicked on outside of dropdown
     */
    handleClickOutside(walletMainRef)
    handleClickOutside(dropdownRef)

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

  }, [walletMainRef, dropdownRef])

  const handleClickOutside = (e: any) => {
    if (setManualModalVisibility) {
      // @ts-ignore
      setManualModalVisibility(walletMainRef?.current?.contains(e.target) || dropdownRef?.current?.contains(e.target))
    }
  }

  return (
    <div ref={walletMainRef} onClick={(e: any) => handleClickOutside(e)}
         className={s.mainContainer}>
      <div className={s.topPull}>
        <div className={s.name}>
          {name}
        </div>
        <div className={s.address}>
          {name !== 'Hey,' && name !== 'No account' ? address && cutWalletPublicId(address) : ''}
        </div>
        <div className={s.arrowBottom}>
          <img alt={'arrow-bottom'} src={arrowBottomIcon} />
        </div>
      </div>
      <div className={s.bottomPull}>
        <span
          className={`${s.bottomPullText} ${name === 'Hey,' ? s.errorText : ''}`}>{name === 'Hey,' ? 'Wrong network!' :
          'Connected to Rinkeby'}
        </span>
      </div>
    </div>
  )
}

export default WalletMain
