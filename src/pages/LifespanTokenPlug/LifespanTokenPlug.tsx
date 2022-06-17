import React, { FC } from 'react'
import lifespanTokenImg from '@/assets/images/lifespan-token/lifespan-token.png'
import s from './LifespanTokenPlug.module.scss'
import { MainActionButton } from '@/components/MainActionButton/MainActionButton'
import { useTranslation } from 'react-i18next'

const LifespanTokenPlug: FC = () => {
  const { t } = useTranslation()
  const mainActionButtonHandler = () => {
    window.location.href = window.config.SIGNUP_URL ?? import.meta.env.VITE_SIGNUP_URL
  }
  return (
    <div className={s.pageContainer}>
      <div className={s.contentContainer}>
        <span className={s.title}>{t('LifespanTokenPlug.title')}</span>
        <div className={s.imageContainer}>
          <img src={lifespanTokenImg}
               className={s.image}
               alt={'lifespan token'} />
        </div>
        <MainActionButton onClick={mainActionButtonHandler}
                          text={t('LifespanTokenPlug.actionButtonText')} />
      </div>
    </div>
  )
}

export default LifespanTokenPlug
