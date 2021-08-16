import React from 'react'
import s from '@/assets/styles/data-display/HomeText.module.scss'

export const HomeText = () => {
  return (
    <div className={s.container}>
            <span className={s.text}>
                Plant a sustainable forest dedicated to our children, the restoration of the Amazon and the wellbeing of a local community in
                <span className={s.primary}>&nbsp;Nueva Esperanza</span>, Peru.
            </span>
    </div>
  )
}