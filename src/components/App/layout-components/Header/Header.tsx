import React, { FC } from 'react'
import s from '@/components/App/layout-components/Header/Header.module.scss'
import { HeaderContent } from './HeaderContent'

export const Header: FC = () => {

  return (
    <div className={s.headerContainer}>
      <HeaderContent />
    </div>
  )
};