import React, { useContext, useState } from 'react'
import WalletIcon from '@/components/App/layout-components/Header/NavBar/Wallet/WalletIcon'
import WalletMain from '@/components/App/layout-components/Header/NavBar/Wallet/WalletMain'
import s from './Wallet.module.scss'
import WalletBalance from '@/components/App/layout-components/Header/NavBar/Wallet/WalletBalance'
import WalletModal from '@/components/App/layout-components/Header/NavBar/Wallet/WalletModal'
import { Gender } from '@/types/Gender'
import { userDetailsContext } from '@/context/UserDetailsProvider'

interface Wallet {
  name: string,
  gender: Gender,
  address: string
}


const Wallet = ({ name, gender, address }: Wallet) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [userDetails, setUserDetails] = useContext(userDetailsContext)

  console.log(userDetails.name)
  return (
    <div className={s.walletContainer}>
      <WalletIcon gender={gender} />
      <WalletMain name={name} setModalVisibility={setModalIsOpen} modalVisibility={modalIsOpen} />
      <WalletBalance />
      <WalletModal isVisible={modalIsOpen} address={address} />
    </div>
  )
}

export default Wallet
