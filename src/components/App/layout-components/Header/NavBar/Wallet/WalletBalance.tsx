import React, { useEffect, useState } from 'react'
import s from './WalletBalance.module.scss'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'

  const WalletBalance = () => {
    const { getPLAIBalance, isConnected } = useMetamaskWallet()
    const [balance, setBalance] = useState(0)

    useEffect(() => {
      const setPLAIBalance = async () => {
        const walletConnected = await isConnected()
        if (walletConnected) {
          getPLAIBalance().then((r) => setBalance(r))
        }
      }
      setPLAIBalance()
    })

  return (
    <div className={s.balanceContainer}>
      {`${balance} Plai`}
    </div>
  )
}
export default WalletBalance
