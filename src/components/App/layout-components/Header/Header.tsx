import React, { FC, useContext, useEffect, useState } from 'react'
import s from '@/components/App/layout-components/Header/Header.module.scss'
import { HeaderContent } from './HeaderContent'
import useMetamaskAuth from '@/hooks/useMetamaskAuth'
import api from '@/api/api'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import WalletProfile from '@/components/App/layout-components/Header/NavBar/WalletProfile'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'

export const Header: FC = () => {
  const { login } = useMetamaskAuth()
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const [walletConnected, setWalletConnected] = useState(false)
  const { isConnected } = useMetamaskWallet()

  const getUserData = () => {
    api.user.users.profile.request()
      .then(response => {
        return response.data
      }).then((r) => {
      setUserDetails({
        ...userDetails,
        address: r.address,
        name: r.name
      })
    })
  }

  useEffect(() => {
    isConnected().then(res => setWalletConnected(res))
  })

  const handleLoginButtonClick = async () => {
    try {
      await login(
        new URL(`${api.url}/${api.user.auth.nonce.url}`),
        new URL(`${api.url}/${api.user.auth.login.url}`)
      )
      getUserData()
    } catch {
      // TODO Handle errors. Now do nothing (perfect scenario)
    }
  }

  return (
    <div className={s.headerContainer}>
      {userDetails.address && walletConnected ?
        <WalletProfile /> :
        <div onClick={() => handleLoginButtonClick()} className={s.loginBtn}>
          Connect
        </div>}
      <HeaderContent />
    </div>
  )
}
