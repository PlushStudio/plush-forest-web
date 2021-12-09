import React, { FC } from 'react'
import s from './WalletBalance.module.scss'

const WalletBalance: FC<{ balance: number | null, ticker: string }> = ({ balance, ticker }) => {
  return (
      balance !== null ?
    <div className={s.balanceContainer}>
      <span className={s.balanceValue}>{balance}</span>
      <span className={s.balanceTicker}>{ticker}</span>
    </div> : <></>
  )
}
export default WalletBalance
