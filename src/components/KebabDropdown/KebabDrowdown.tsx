import React, { useEffect, useRef, useState } from 'react'
import kebabIcon from "@/assets/images/wallet/32-px-1-outlined-kebab-horizontal.svg";
import s from "./KebabDrowdown.module.scss"
import classNames from "classnames";
import { useOnClickOutside } from "usehooks-ts";

interface MenuItem {
  title: string,
  href: string,
  icon: string
}

const WalletKebab = (props: { menuList: MenuItem[] }) => {
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = useState<boolean>(true)
  const kebabRef = useRef(null)

  const handleClickOutside = () => {
    setIsKebabDropdownOpen(false)
  }

  const menuItemHandler = (href: string) => {
    setIsKebabDropdownOpen(false)
    window.open(href, '_blank')
  }

  useEffect(() => {
    console.log(isKebabDropdownOpen)
  }, [isKebabDropdownOpen])

  useOnClickOutside(kebabRef, handleClickOutside)

  return (
    <div ref={kebabRef} className={s.kebab} onClick={() => setIsKebabDropdownOpen(true)}>
      <img alt={'kebab button'} src={kebabIcon} />
      <div className={classNames(s.kebabDropdown, isKebabDropdownOpen ? s.visible : s.hidden)}>
        {
          props.menuList.map((menuItem: MenuItem, index: number) =>
            <div onClick={() => menuItemHandler(menuItem.href)}
              key={menuItem.href + index}
              className={s.kebabListItemContainer}>
              <div className={s.kebabListItem}>
                {menuItem.title}
                <div className={s.menuItemIcon}>
                  <img alt={"menu list icon"} src={props.menuList[index].icon} />
                </div>
              </div>
            </div>)
        }
      </div>
    </div>
  )
}

export default WalletKebab
