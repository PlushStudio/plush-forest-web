import React from 'react'
import s from './HomeFeatureSections.module.scss'
import twoBirds from '@/assets/images/abstractHomeImages/abstract-two-birds.png'
import { useTranslation } from 'react-i18next'

export const SecondFeatureSection = () => {
  const { t } = useTranslation()
  return (
    <div className={s.container}>
      <div className={s.secondContainerText}>
        <span className={s.title}>
          {t('HomePage.SecondInfoBlock.title')}
        </span>
        <span className={s.description}>
            {t('HomePage.SecondInfoBlock.description')}
        </span>
      </div>
      <img className={s.imageBlock} src={twoBirds} alt='two birds' />
    </div>
  )
}
