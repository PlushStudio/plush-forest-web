import React, { FC } from 'react'
import s from '@/components/common/App/layout-components/HeaderContent.module.scss'
import treeIcon from '@/assets/images/tree-icon.svg'

export const HeaderContent: FC = () => {
  return (
    <div className={s.headerContainer}>
      <img alt={s.treeIcon} src={treeIcon} className='treeIcon' />
      <div className={s.contentBlock}>
        <span className={s.logoTitle}>Plush Forest</span>
        <span className={s.logoDescription}>Dedicate a tree to your child in the forest full of wonder.</span>
      </div>
    </div>)
}