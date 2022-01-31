import React, { useEffect, useRef, useState } from 'react'
import s from './WalletMain.module.scss'
import { cutWalletPublicId } from '@/utils/utils'
import arrowBottomIcon from '@/assets/images/wallet/arrow-bottom.svg'
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface WalletMain {
  setDropdownVisibility?: (modalVisibility: boolean | null | undefined) => void | undefined,
  name: string,
  address: string,
  isOpenDropdown: boolean | undefined | null,
  dropdownRef: React.MutableRefObject<null>
}

const WalletMain = ({ setDropdownVisibility, name, address, dropdownRef, isOpenDropdown }: WalletMain) => {
  const [transformState, setTransformState] = useState<string>('')
  const walletMainRef = useRef(null)

  useEffect(() => {
    isOpenDropdown ? setTransformState('rotate(180deg)') : setTransformState('')
  }, [isOpenDropdown])

  const handleClickOutside = () => {
    if (setDropdownVisibility) {
      setDropdownVisibility(false)
    }
  }
  const handleClickInside = () => {
    if (setDropdownVisibility) {
      setDropdownVisibility(true)
    }
  }
  useOnClickOutside(dropdownRef, handleClickOutside)

  return (
    <div ref={walletMainRef} onClick={() => handleClickInside()}
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
