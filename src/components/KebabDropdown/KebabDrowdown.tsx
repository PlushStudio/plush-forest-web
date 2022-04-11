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
  const [kebabDropdownOpen, setKebabDropdownOpen] = useState<boolean>(true)
  const kebabRef = useRef(null)

  const handleClickOutside = () => {
    setKebabDropdownOpen(false)
  }

  const handleMenuItemClick = (href: string) => {
    setKebabDropdownOpen(false)
    window.open(href, '_blank')
  }

  useOnClickOutside(kebabRef, handleClickOutside)

  return (
    <div ref={kebabRef} className={s.kebab} onClick={() => setKebabDropdownOpen(true)}>
      <img alt={'kebab button'} src={kebabIcon} />
      <div className={classNames(s.kebabDropdown, kebabDropdownOpen ? s.visible : s.hidden)}>
        {
          props.menuList.map((menuItem: MenuItem, index: number) =>
            <div onClick={() => handleMenuItemClick(menuItem.href)}
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
