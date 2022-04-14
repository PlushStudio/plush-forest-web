import React, { FC } from 'react'
import s from '../Modals.module.scss'
import ModalImg from '@/assets/images/image-1@3x.png'

const NoPlushTokenModal: FC<{ redirectTo?: string }> = ({ redirectTo }) => {
  return (
    <div className={s.noPlushTokenContainer}>
      <div className={s.modal}>
        <img src={ModalImg} alt="no token" />
        <h2>No token</h2>
        <p className={s.description}>There is no Plush token in your account. <br />It&apos;s required for creating Forest NFT</p>
        <a target={'_blank'} href={redirectTo} rel="noreferrer">Get token</a>
      </div>
    </div>
  )
}

export default NoPlushTokenModal
