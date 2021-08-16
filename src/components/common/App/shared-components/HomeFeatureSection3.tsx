import React from 'react'
import s from '@/assets/styles/layout/HomeFeatureSection.module.scss'
import steps from '@/assets/images/steps.svg'
import bigTree from '@/assets/images/picture-large-tree.png'
import leaf from '@/assets/images/leaf.svg'
import lines from '@/assets/images/lines.svg'

export const HomeFeatureSection3 = () => {
  return (
    <div className={s.container}>
      <div className={s.imageBlock}>

        <img className={s.steps} src={steps} alt='leaf steps' />
        <img className={`${s.bigTree} ${s.maskedImg}`} src={bigTree} alt='big tropical tree' />
      </div>
      <div className={s.firstContainerText}>
                <span className={s.title}>
                    A forest of a thousand wishes.
                </span>
        <span className={`${s.section3Description} ${s.description}`}>
                  Each tree comes with an option to add a secret note for your child. Only [Jenny] will be able to read it, and only on a date that you specify.
                    And thanks to smart contract technology, your message will be private and secure.
                </span>
        <span className={`${s.link} ${s.section3GetStarted}`}>Get started</span>
      </div>
      <div className={s.leafContainer}>
        <img className={s.lines} src={lines} alt='lines' />
        <img className={s.leaf} src={leaf} alt='leaf' />
      </div>
    </div>
  )
}