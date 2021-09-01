import React, {FC,} from 'react'
import s from '@/components/App/layout-components/Header/HeaderContent.module.scss'
import treeIcon from '@/assets/images/tree-icon.svg'
import {Link} from "react-router-dom";

export const HeaderContent: FC = () => {

    return (
        <div className={s.headerContainer}>
            <Link to={"/"}><img className={s.treeIcon} src={treeIcon} alt="tree icon"/></Link>
            <div className={s.contentBlock}>
                <span className={s.logoTitle}>Plush Forest</span>
                <span className={s.logoDescription}>Dedicate a tree to your child in the forest full of wonder.</span>
            </div>
        </div>)
};