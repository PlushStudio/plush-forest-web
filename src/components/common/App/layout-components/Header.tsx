import React, { FC } from 'react'
import s from '@/components/common/App/layout-components/Header.module.scss'
import { HeaderContent } from './HeaderContent'

export const Header: FC = () => {

  return (
    <div className={s.headerContainer}>
      <HeaderContent />
    </div>
  )
}