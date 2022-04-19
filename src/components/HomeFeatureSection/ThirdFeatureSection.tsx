import React from 'react'
import s from './HomeFeatureSections.module.scss'
import bigTree from '@/assets/images/abstractHomeImages/abstract-large-tree.png'
import leaf from '@/assets/images/leaf/leaf.svg'
import lines from '@/assets/images/dashLines/lines.svg'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export const ThirdFeatureSection = () => {
  const { t } = useTranslation()
  return (
    <div className={s.container}>
      <div className={s.imageBlock}>
        <img className={s.bigTree} src={bigTree} alt='big tropical tree' />
      </div>
      <div className={s.thirdContainerText}>
        <span className={s.title}>
          {t('HomePage.ThirdInfoBlock.title')}
        </span>
        <span className={classNames(s.sectionThreeDescription, s.description)}>
              {t('HomePage.ThirdInfoBlock.description')}
        </span>
        <span className={s.sectionThreeGetStarted}> {t('HomePage.ThirdInfoBlock.comingSoonLink')}</span>
      </div>
      <div className={s.leafContainer}>
        <img className={s.lines} src={lines} alt='lines' />
        <img className={s.leaf} src={leaf} alt='leaf' />
      </div>
    </div>
  )
}
