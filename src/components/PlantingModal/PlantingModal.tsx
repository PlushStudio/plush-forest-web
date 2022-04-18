import React, { FC } from 'react'
import s from './PlantingModal.module.scss'
import './Loader.scss'
import { useTranslation } from 'react-i18next'

interface PlantingModalProps {
  step: number
}

export const PlantingModal: FC<PlantingModalProps> = ({ step }) => {
  const { t } = useTranslation()

  const plantingModalInfo: Array<{
    stepName: string,
    subtitle: string,
    title: string,
    timing: string,
    content: string
  }> = t('PlantingPage.PlantingModal', { returnObjects: true })
  return (
    <div className={s.modalContainer}>
      <div className={s.modalContent}>
        <div className={s.modalTitle}>
          <span className={s.modalTitleStep}>
            Step {step + 1}/2:
          </span>
          {plantingModalInfo[step].title}
        </div>
        <div className={s.modalSecondText}>{plantingModalInfo[step].timing}</div>
        <div className="loaderContainer">
          <div className="loro">
            <div className="circ" />
            <div className="circ3" />
            <div className="circ5" />
            <div className="circ7" />
            <div className="ojo" />
          </div>
        </div>
        <div className={s.modalFooterContainer}>
          <div className={s.modalFooterTitle}>{plantingModalInfo[step].subtitle}</div>
          <div className={s.modalFooterText}>{plantingModalInfo[step].content}</div>
        </div>
      </div>
    </div>
  )
}
