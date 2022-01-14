import React, { useEffect, useRef, useState } from 'react'
import kebabIcon from "@/assets/images/wallet/32-px-1-outlined-kebab-horizontal.svg";
import s from "./KebabDrowdown.module.scss"
import { Link } from "react-router-dom";
import outlineGlobe from '@/assets/images/wallet/24-px-1-outlined-globe.svg'

interface MenuItem {
  title: string,
  href: string
}

const WalletKebab = () => {
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = useState<boolean>(false)
  const [activeItemId, setActiveItemId] = useState<number>(0)
  const kebabRef = useRef(null)

  const menuList = [
    {
      title: 'About',
      href: '/'
    },
    {
      title: 'Discord',
      href: '/discord'
    },
    {
      title: 'Privacy',
      href: '/privacy'
    },
    {
      title: 'Terms',
      href: '/terms'
    }
  ];

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

  const menuItemHandler = (itemName: string, index: number) => {
    setActiveItemId(index)
    setIsKebabDropdownOpen(false)
  }

  return (
    <div ref={kebabRef} className={s.kebab} onClick={() => setIsKebabDropdownOpen(!isKebabDropdownOpen)}>
      <img alt={'kebab button'} src={kebabIcon} />
      <div className={`${s.kebabDropdown} ${isKebabDropdownOpen ? s.visible : s.hidden}`}>
        {
          menuList.map((menuItem: MenuItem, index: number) =>
            <div key={index} className={`${s.kebabListItemContainer} ${activeItemId === index ? s.kebabListItemContainerActive : ''}`}>
              <Link to={'/'} onClick={() => menuItemHandler(menuItem.href, index)}>
                <div className={`${activeItemId === index ? s.activeMenuItem : s.kebabListItem}`}>
                  {menuItem.title}
                  <div className={s.menuItemIcon}>
                    <img alt={"globe icon"} className={activeItemId === index ? s.iconActive : ''} src={outlineGlobe} />
                  </div>
                </div>
              </Link>
            </div>)
        }
      </div>
    </div>
  )
}

export default WalletKebab