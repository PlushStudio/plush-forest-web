import React from 'react'
import s from '@/components/common/App/shared-components/HomeFeatureSection.module.scss'
import plantDots from '@/assets/images/planting-dots.svg'
import womanWithPlant from '@/assets/images/woman-with-plant@2x.jpg'

export const HomeFeatureSection1 = () => {
  return (
    <div className={s.container}>
      <div className={s.imageBlock}>
        <img className={s.womanWithPlant + ' ' + s.maskedImg} src={womanWithPlant} alt='two birds' />
        <img className={s.plantingDots} src={plantDots} alt='planting dots' />
      </div>
      <div className={s.firstContainerText}>
                <span className={s.title}>
                    Plant a tree. Celebrate life.
                </span>
        <span className={s.description}>
                    On average, one hectare of Amazon forest conserves 130 tons of carbon per year.
                    But the carbon offset is only the beginning. Our forest will be home to hundreds
                    of species of animals and plants found nowhere else in the world. <br /> <br />
                    The forest will also provide the much needed support to the remote farming
                    communities, by giving them the necessary resources to lift them out of poverty.
                </span>
        <span className={s.link}>How it works</span>
      </div>
    </div>
  )
}