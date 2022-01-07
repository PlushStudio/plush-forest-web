import React, { useEffect, useRef, useState } from 'react'
import kebabIcon from "@/assets/images/wallet/32-px-1-outlined-kebab-horizontal.svg";
import s from "./KebabDrowdown.module.scss"

interface KebabDrowdown {
  keys: string[],
  isOpen: boolean
}

const WalletKebab = ({ keys, isOpen }: KebabDrowdown) => {
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = useState<boolean>(isOpen)
  const kebabRef = useRef(null)

  const handleClickOutside = (e: any) => {
    // @ts-ignore
    setIsKebabDropdownOpen(kebabRef?.current?.contains(e.target))
  }

  useEffect(() => {
    /**
     * Set dropdown state if clicked on outside of dropdown
     */
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const menuItemHandler = (itemName: string) => {

  }

  return (
    <div ref={kebabRef} className={s.kebab} onClick={() => setIsKebabDropdownOpen(!isKebabDropdownOpen)}>
      <img alt={'kebab button'} src={kebabIcon} />
      <div className={`${s.kebabDropdown} ${isKebabDropdownOpen ? s.visible : s.hidden}`}>
        {
          keys.map((value: string) =>
            <div onClick={() => menuItemHandler(value)} className={s.kebabListItem}>{value}</div>)
        }
      </div>
    </div>
  )
}

export default WalletKebab
