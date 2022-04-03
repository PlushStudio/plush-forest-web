import React from 'react'
import s from './PlantingModal.module.scss'
import './Loader.scss'
import modalData from '@/assets/data/MintingModal'

interface Status {
  status: string
}

export const PlantingModal = ({ status }: Status) => {
  return (
    <div className={s.modalContainer}>
      <div className={s.modalContent}>
        <div className={s.modalTitle}>
          <span className={s.modalTitleStep}>
            Step {modalData[status].step}/2:
          </span>
          {modalData[status].title}
        </div>
        <div className={s.modalSecondText}>{modalData[status].timing}</div>
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
          <div className={s.modalFooterTitle}>Did you know?</div>
          <div className={s.modalFooterText}>{modalData[status].content}</div>
        </div>
      </div>
    </div>
  )
}
