import React, { FC } from 'react'
import s from '@/components/Footer/Footer.module.scss'
import { LearnMoreAccordion } from '@/components/Accordion/Accordion'
import { SoilFooterWithContacts } from './SoilFooterWithContacts'
import { useTranslation } from 'react-i18next'

export const Footer: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className={s.footerContainer}>
        <div className={s.footerContent}>
          <div className={s.footerTitle}>{t('Footer.title')}</div>
          <LearnMoreAccordion />
        </div>
      </div>
      <SoilFooterWithContacts />
    </>
  )
}
