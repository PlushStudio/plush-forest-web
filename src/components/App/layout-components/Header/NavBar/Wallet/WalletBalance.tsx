import React, { FC } from 'react'
import s from './WalletBalance.module.scss'

const WalletBalance: FC<{ balance: any }> = ({ balance }) => {
  return (
    balance &&
    <div className={s.balanceContainer}>
      {`${balance} Plai`}
    </div>
  )
}
export default WalletBalance
