import React from 'react'
import s from '@/assets/styles/layout/HomeFeatureSection.module.scss'
import dots from '@/assets/images/dots.png'
import twoBirds from '@/assets/images/two-birds.png'

export const HomeFeatureSection2 = () => {
  return (
    <div className={s.container}>
      <div className={s.secondContainerText}>
                <span className={s.title}>
                  Blockchain certified & transparent.
                </span>
        <span className={s.description}>
                    With the help from our friends at Ecomatcher, you will have access to the precise location of the tree,
                    the species planted, the date of planting, and the farmer who will be taking care of your child’s tree.
                    All information will be securely stored on blockchain and connected to your child’s Plush NFT token.
                </span>
      </div>
      <div className={s.imageBlock}>
        <img className={s.twoBirds + ' ' + s.maskedImg} src={twoBirds} alt='two birds' />
        <img className={s.dots} src={dots} alt='planting dots' />
      </div>
    </div>
  )
}