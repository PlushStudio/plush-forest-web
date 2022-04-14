import React, { FC } from 'react'
import s from '@/components/Footer/Footer.module.scss'
import { LearnMoreAccordion } from '@/components/Accordion/Accordion'
import { SoilFooterWithContacts } from './SoilFooterWithContacts'

export const Footer: FC = () => {
  return (
    <>
      <div className={s.footerContainer}>
        <div className={s.footerContent}>
          <div className={s.footerTitle}>Learn more</div>
          <LearnMoreAccordion />
        </div>
      </div>
      <SoilFooterWithContacts />
    </>
  )
}
