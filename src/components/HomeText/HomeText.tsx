import React from 'react'
import s from './HomeText.module.scss'
import { useTranslation } from 'react-i18next'

export const HomeText = () => {
  const { t } = useTranslation()
  return (
    <div className={s.container}>
      <span className={s.text}>
      {t('HomePage.MainText')}
      </span>
    </div>
  )
}
