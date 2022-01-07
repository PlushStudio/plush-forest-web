import React, { useEffect, useRef, useState } from 'react'
import s from './WalletMain.module.scss'
import { cutWalletPublicId } from '@/utils/utils'
import arrowBottomIcon from '@/assets/images/wallet/arrow-bottom.svg'

interface WalletMain {
  setModalVisibility?: (modalVisibility: boolean | null | undefined) => void | undefined,
  name: string,
  address: string,
  isOpenDropdown: boolean | undefined | null,
  dropdownRef: React.MutableRefObject<null>
}

const WalletMain = ({ setModalVisibility, name, address, dropdownRef, isOpenDropdown }: WalletMain) => {
  const [transformState, setTransformState] = useState('')

  useEffect(() => {
    isOpenDropdown ? setTransformState('rotate(180deg)') : setTransformState('')
  }, [isOpenDropdown])

  const walletMainRef = useRef(null)

  useEffect(() => {
    /**
     * Set dropdown state if clicked on outside of dropdown
     */
    document.addEventListener('click', handleClickOutside)
    handleClickOutside(false)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }

  }, [walletMainRef, dropdownRef])

  const handleClickOutside = (e: any) => {
    if (setModalVisibility) {
      // @ts-ignore
      setModalVisibility(walletMainRef?.current?.contains(e.target) || dropdownRef?.current?.contains(e.target))
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
          <img alt={'arrow-bottom'} style={{ transform: transformState, transition: '.2s ease' }} src={arrowBottomIcon} />
        </div>
      </div>
      <div className={s.bottomPull}>
        <span
          className={`${s.bottomPullText} ${name === 'Hey,' ? s.errorText : ''}`}>{name === 'Hey,' ? 'Wrong network!' :
            'Connected to Mumbai'}
        </span>
      </div>
    </div>
  )
}

export default WalletMain
