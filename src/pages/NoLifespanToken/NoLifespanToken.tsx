import React, { FC } from 'react'
import lifespanTokenImg from '@/assets/images/lifespan-token/lifespan-token.png'
import s from './NoLifespanToken.module.scss'
import { MainActionButton } from '@/components/MainActionButton/MainActionButton'
import { useTranslation } from 'react-i18next'

const NolLifespanToken: FC = () => {
  const { t } = useTranslation()
  const mainActionButtonHandler = () => {
    window.location.href = window.config.SIGNUP_URL ?? import.meta.env.VITE_SIGNUP_URL
  }
  return (
    <div className={s.pageContainer}>
      <div className={s.contentContainer}>
        <span className={s.title}>{t('NoLifespanToken.title')}</span>
        <div className={s.imageContainer}>
          <img src={lifespanTokenImg}
               className={s.image}
               alt={'lifespan token'} />
        </div>
        <MainActionButton onClick={mainActionButtonHandler}
                          text={t('NoLifespanToken.actionButtonText')} />
      </div>
    </div>
  )
}

export default NolLifespanToken
