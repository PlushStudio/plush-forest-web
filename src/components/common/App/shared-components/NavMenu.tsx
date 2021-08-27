import React, {useState} from 'react'
import s from '@/components/common/App/shared-components/NavMenu.module.scss'
import chart from '@/assets/images/32-px-1-outlined-chart.png'
import gallery from '@/assets/images/32-px-1-outlined-gallery-01.png'
import map from '@/assets/images/32-px-1-outlined-map-pin.png'
import note from '@/assets/images/32-px-1-outlined-note.png'
import tree from '@/assets/images/32-px-1-outlined-tree.png'

const NavItems = [tree, chart, gallery, map, note];

export const NavMenu = () => {

    const [isActive, setIsActive] = useState(0);

    const menuHandler = (navItemId: number) => {
        setIsActive(navItemId)
    };

    return (
        <div className={s.navMenuContainer}>
            <div className={s.navMenuWrapper}>
                {NavItems.map((item, index) =>
                    <div onClick={() => menuHandler(index)}
                         className={`${s.navMenuItem} ${isActive === index && s.active} 
                         ${(index === 0 && s.roundedTop)}
                         ${(index === NavItems.length - 1 && s.roundedBottom)}`}
                    >
                        <img className={s.navItemImg} src={item} alt="menu item"/>
                    </div>
                )}
            </div>
        </div>
    )
}