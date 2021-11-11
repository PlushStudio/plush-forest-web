import React, { useContext, useState } from 'react'
import s from './PlantingModal.module.scss'
import './Loader.scss'
import { userDetailsContext } from '@/context/UserDetailsProvider'

interface Status {
  status: string
}

export const PlantingModal = ({ status }: Status) => {
  const [userDetails, setUserDetails] = useContext(userDetailsContext)

  return (
    <div className={s.modalContainer}>
      <div className={s.modalContent}>
        <div className={s.modalTitle}>
          Waiting for {status}
        </div>
        <div className={s.modalSecondText}>
          This should take about 10 - 15 sec.
        </div>
        <div className='loaderContainer'>
          <div className='loro'>
            <div className='circ' />
            <div className='circ3' />
            <div className='circ5' />
            <div className='circ7' />
            <div className='ojo' />
          </div>
        </div>
        <div className={s.modalFooterContainer}>
          <div className={s.modalFooterTitle}>
            Did you know?
          </div>
          <div className={s.modalFooterText}>
            Agroforestry provides increased economic and environmental benefits to local communities and the planet.
            From sustainable production and higher yields, to reduction of chemicals and energy to enhanced biodiversity
            and wellbeing for animals.
          </div>
        </div>

      </div>
    </div>
  )
}
