import React, { useEffect, useState } from 'react'
import WalletIcon from '@/components/App/layout-components/Header/NavBar/Wallet/WalletIcon'
import WalletMain from '@/components/App/layout-components/Header/NavBar/Wallet/WalletMain'
import s from './Wallet.module.scss'
import WalletBalance from '@/components/App/layout-components/Header/NavBar/Wallet/WalletBalance'
import WalletModal from '@/components/App/layout-components/Header/NavBar/Wallet/WalletModal'
import { Gender } from '@/types/Gender'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'

interface Wallet {
  name: string,
  gender: Gender,
  address: string,
  chainId: string
}

const Wallet = ({ name, gender, address, chainId }: Wallet) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const { getPLAIBalance, isConnected } = useMetamaskWallet()
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    setPLAIBalance()
  }, [chainId])

  const setPLAIBalance = async () => {
    const walletConnected = await isConnected()
    if (walletConnected) {
      getPLAIBalance().then((r) => setBalance(r))
    }
  }

  useEffect(() => {
    setPLAIBalance()
  })

  return (
    <div className={s.walletContainer}>
      <WalletIcon currentChain={chainId} gender={gender} />
      <WalletMain name={chainId === '4' ? name : 'Hey,'}
                  setModalVisibility={setModalIsOpen}
                  modalVisibility={modalIsOpen}
                  address={address}
      />
      <WalletBalance balance={chainId === '4' ? balance : null} />
      <WalletModal type={chainId !== '4' ? 'networkError' : 'success'} isVisible={modalIsOpen} address={address} />
    </div>
  )
}

export default Wallet
