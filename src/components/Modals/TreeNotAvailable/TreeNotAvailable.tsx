import React from 'react'
import { Link } from 'react-router-dom'
import s from '../Modals.module.scss'
import ModalImg from '@/assets/images/cryingImage/crying-image.png'
import { useTranslation } from 'react-i18next'

const TreeNotAvailable = () => {
  const { t } = useTranslation()
  return (
    <div className={s.treeNotAvailableContainer}>
      <div className={s.modal}>
        <img src={ModalImg} alt="" />
        <h2>{t('Modals.TreeNotAvailable.title')}</h2>
        <p>{t('Modals.TreeNotAvailable.description')}</p>
        <Link to={'/'}>{t('Modals.TreeNotAvailable.actionButtonText')}</Link>
      </div>
    </div>
  )
}

export default TreeNotAvailable
