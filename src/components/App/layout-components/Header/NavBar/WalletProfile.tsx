import React, { FC, useContext, useEffect, useState } from 'react'
import s from './WalletProfile.module.scss'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import Wallet from '@/components/App/layout-components/Header/NavBar/Wallet/Wallet'
import WalletIcon from '@/components/App/layout-components/Header/NavBar/Wallet/WalletIcon'
import WalletMain from '@/components/App/layout-components/Header/NavBar/Wallet/WalletMain'
import WalletKebab from '@/components/App/layout-components/Header/NavBar/Wallet/WalletKebab'
import WalletBalance from '@/components/App/layout-components/Header/NavBar/Wallet/WalletBalance'
import WalletModal from '@/components/App/layout-components/Header/NavBar/Wallet/WalletModal'

const VITE_NETWORK_ID = window.config.NETWORK_ID ?? '4'

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
      {userDetails.currentChainId === VITE_NETWORK_ID ?
        <>
          <div className={s.walletContainer}>
            {userDetails.address === '' ||
            userDetails.address === 'logouted' ?
              <>
                <WalletIcon />
                <WalletMain />
                <WalletKebab />
              </>
              :
              <>
                <WalletIcon />
                <WalletMain />
                <WalletBalance balance={balance} />
                <WalletKebab />
              </>
            }
            <WalletModal />
          </div>
        </> :
        <div className={s.wrongNetworkContainer}>Wrong network detected</div>}
    </div>
  )
}

export default WalletProfile
