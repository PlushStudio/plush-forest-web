import React from 'react'
import s from './HomeFeatureSections.module.scss'
import womanWithPlant from '@/assets/images/abstractHomeImages/abstract-woman-with-plants.png'
import { setActiveAccordionTabIdEvt } from '@/store/app'
import { useTranslation } from 'react-i18next'

export const FirstFeatureSection = ({ accordionRef }: any) => {
  const { t } = useTranslation()

  const scrollToAccordion = () => {
    setActiveAccordionTabIdEvt(0)
    if (accordionRef && accordionRef.current) {
      accordionRef.current.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={s.container}>
      <img
        className={s.imageBlock}
        src={womanWithPlant}
        alt="two birds"
      />
      <div className={s.firstContainerText}>
        <span className={s.title}>{t('HomePage.FirstInfoBlock.title')}</span>
        <span className={s.description}>
          <p>
             {t('HomePage.FirstInfoBlock.partOneDescription')}
          </p>
          <p>
             {t('HomePage.FirstInfoBlock.partTwoDescription')}
          </p>
        </span>
        <span role={'presentation'}
              onClick={() => scrollToAccordion()}
              className={s.link}>  {t('HomePage.FirstInfoBlock.howItWorksLink')}
        </span>
      </div>
    </div>
  )
}
