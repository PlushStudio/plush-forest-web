import React, { FC } from 'react'
import s from './WalletBalance.module.scss'

const WalletBalance: FC<{ balance: any }> = ({ balance }) => {
  return (
    <div className={s.balanceContainer}>
      {balance && `${balance}`}
    </div>
  )
}
export default WalletBalance
