import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './NoPlushTokenModal.module.scss'
import ModalImg from '@/assets/images/image-1@3x.png'

const NoPlushTokenModal: FC<{ redirectTo?: string, }> = ({ redirectTo, }) => {
  return (
    <div className={s.container}>
      <div className={s.modal}>
        <img src={ModalImg} alt="" />
        <h2>No token</h2>
        <p className={s.description}>There is no Plush token in your account. <br />It's required for creating Forest NFT</p>
        <a target={'_blank'} href={`${redirectTo}`}>Get token</a>
      </div>
    </div>
  )
}

export default NoPlushTokenModal
