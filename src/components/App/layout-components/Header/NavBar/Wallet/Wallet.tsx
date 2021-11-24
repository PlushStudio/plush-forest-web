import React, { FC, useContext } from 'react'
import WalletIcon from '@/components/App/layout-components/Header/NavBar/Wallet/WalletIcon'
import WalletMain from '@/components/App/layout-components/Header/NavBar/Wallet/WalletMain'
import WalletKebab from '@/components/App/layout-components/Header/NavBar/Wallet/WalletKebab'
import s from './Wallet.module.scss'
import WalletBalance from '@/components/App/layout-components/Header/NavBar/Wallet/WalletBalance'
import WalletModal from '@/components/App/layout-components/Header/NavBar/Wallet/WalletModal'
import { Gender } from '@/types/Gender'
import { userDefault } from '@/context/DefaultValue'

interface Wallet {
  gender: Gender,
  onConnected: () => void
  onDisconnected: () => void
  // pick network type
  onNetworkChange: (network: string) => void
}

const Wallet: FC<Wallet> = ({gender}) => {
  return (
    <>
      <div className={s.walletContainer}>
        {userDefault.address ? <>
            <WalletIcon />
            <WalletMain/>
            <WalletKebab />
          </>
          :
          <>
            <WalletIcon/>
            <WalletMain />
            <WalletBalance/>
          </>
        }
        <WalletModal/>
      </div>
    </>
  )
}

export default Wallet
