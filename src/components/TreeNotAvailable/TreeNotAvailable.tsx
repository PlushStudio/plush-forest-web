import React from 'react'
import { Link } from 'react-router-dom'
import s from './TreeNotAvailable.module.scss'
import ModalImg from '@/assets/images/cryingImage/crying-image.png'

const TreeNotAvailable = () => {
  return (
    <div className={s.container}>
      <div className={s.modal}>
        <img src={ModalImg} alt="" />
        <h2>Tree not available</h2>
        <p>This tree does not exist on Plush Forest.</p>
        <Link to={'/'}>OK</Link>
      </div>
    </div>
  )
}

export default TreeNotAvailable
