import React from 'react'
import s from './HomeFeatureSection.module.scss'
import bigTree from '@/assets/images/picture-large-tree.png'
import leaf from '@/assets/images/leaf.svg'
import lines from '@/assets/images/lines.svg'
import classNames from 'classnames'

export const HomeFeatureSection3 = () => {
  return (
    <div className={s.container}>
      <div className={s.imageBlock}>
        <img className={s.bigTree} src={bigTree} alt='big tropical tree' />
      </div>
      <div className={s.thirdContainerText}>
        <span className={s.title}>
          A forest of a thousand wishes.
        </span>
        <span className={classNames(s.sectionThreeDescription, s.description)}>
          Each tree comes with an option to add a secret note for your child. Only your child will be able to read it, and only on a date that you specify. And thanks to smart contract technology, your message will be securely sealed until your child is ready to view it.
        </span>
        <span className={s.sectionThreeGetStarted}>Coming soon</span>
      </div>
      <div className={s.leafContainer}>
        <img className={s.lines} src={lines} alt='lines' />
        <img className={s.leaf} src={leaf} alt='leaf' />
      </div>
    </div>
  )
}
