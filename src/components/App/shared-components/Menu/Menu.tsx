import React, {useRef, useState} from 'react'
import s from "./Menu.module.scss"
import MenuDropdown from "@/components/App/shared-components/Menu/MenuDropdown";
import classNames from "classnames";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface MenuItem {
  title: string,
  href: string,
  icon: string
}

const Menu = (menuOpener: React.ReactNode, menuList: MenuItem[], dropdownStyle?: string) => {
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = useState<boolean>(false)
  const dropdownRef = useRef(null)

  const dropdownClassName = classNames({
    [s.hidden]: !isKebabDropdownOpen,
  }, dropdownStyle)

  const handleClickOutside = () => {
    setIsKebabDropdownOpen(false)
  }

  useOnClickOutside(dropdownRef, handleClickOutside)

  return (
    <>
    <div onClick={() => setIsKebabDropdownOpen(true)}
         className={s.menuContainer}>
      {menuOpener}
    </div>
      <div className={dropdownClassName} ref={dropdownRef}>
        <MenuDropdown menuList={menuList}/>
      </div>
    </>
  );
}

export default Menu