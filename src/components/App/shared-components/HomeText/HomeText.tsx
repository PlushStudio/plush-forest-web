import React from 'react'
import s from './HomeText.module.scss'

export const HomeText = () => {
  return (
    <div className={s.container}>
            <span className={s.text}>
              Dedicate a tree to your child in the sustainable
              Amazon forest and help the local community of Campoverde,
              Peru improve their livelihood.
            </span>
    </div>
  )
}