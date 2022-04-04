import React, { useState } from 'react'
import s from './NavMenu.module.scss'
import chart from '@/assets/images/32-px-1-outlined-chart-gray.png'
import gallery from '@/assets/images/32-px-1-outlined-gallery-01-gray.png'
import map from '@/assets/images/32-px-1-outlined-map-pin-gray.png'
import note from '@/assets/images/32-px-1-outlined-note-gray.png'
import tree from '@/assets/images/32-px-1-outlined-tree-white.png'
import { Link } from 'react-router-dom'

export const NavMenu: React.FC = () => {

    const NavItems: string[] = [tree, chart, gallery, map, note];
    const NavLinks: string[] = ['tree', 'chart', 'gallery', 'map', 'note'];

    const [isActive, setIsActive] = useState<number>(0);

    const menuHandler = (navItemId: number) => {
        setIsActive(navItemId)
    };

    return (
        <div className={s.navMenuContainer}>
            <div className={s.navMenuWrapper}>
                {NavItems.map((item: string, index: number) =>
                    <div onClick={() => menuHandler(index)}
                        className={`${s.navMenuItem} ${isActive === index && s.active} 
                         ${(index === 0 && s.roundedTop)}
                         ${(index === NavItems.length - 1 && s.roundedBottom)}`}
                    >
                        <Link to={`${NavLinks[index]}`}>
                            <img className={s.navItemImg} src={item} alt="menu item" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}