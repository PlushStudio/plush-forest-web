import React, { useState } from 'react'
import s from "./Menu.module.scss"
import { Link } from "react-router-dom";
import classNames from "classnames";

interface MenuItem {
  title: string,
  href: string,
  icon: string
}

const MenuDropdown = (props: { menuList: MenuItem[], className?: string }) => {
  const [activeItemId, setActiveItemId] = useState<number>(0)
  const menuItemHandler = (itemName: string, index: number) => setActiveItemId(index)

  return (
    <div className={classNames(s.kebabDropdown, props.className)}>
      {
        props.menuList.map((menuItem: MenuItem, index: number) =>
          <div className={`${s.kebabListItemContainer} ${activeItemId === index ? s.kebabListItemContainerActive : ''}`}>
            <Link to={menuItem.href} onClick={() => menuItemHandler(menuItem.href, index)}>
              <div className={`${activeItemId === index ? s.activeMenuItem : s.kebabListItem}`}>
                {menuItem.title}
                <div className={s.menuItemIcon}>
                  <img alt={"menu list icon"} src={props.menuList[index].icon} />
                </div>
              </div>
            </Link>
          </div>)
      }
    </div>
  )
}

export default MenuDropdown