import React from 'react'
import s from '@/components/common/App/shared-components/HomeText.module.scss'

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