import React, { FC, useContext, useEffect, useState } from 'react'
import s from './WalletProfile.module.scss'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'
import Wallet from './Wallet/Wallet'
import notificationIcon from '@/assets/images/combined-shape@3x.png'
import burgerIcon from '@/assets/images/atom-icon-more-horizontal@2x.png'
import { userDetailsContext } from '@/context/UserDetailsProvider'

const WalletProfile: FC = () => {
  const { getPLAIBalance } = useMetamaskWallet()
  const [balance, setBalance] = useState(0)
  const { isConnected } = useMetamaskWallet()
  const [userDetails] = useContext(userDetailsContext)

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
    <div className={s.walletContainer}>
      <Wallet walletAddress={userDetails.address} balance={balance} />
      <img alt='notification' className={s.outsideWalletItem} src={notificationIcon} />
      <img alt='sub-menu' className={s.outsideWalletItem} src={burgerIcon} />
    </div>
  )
}

export default WalletProfile