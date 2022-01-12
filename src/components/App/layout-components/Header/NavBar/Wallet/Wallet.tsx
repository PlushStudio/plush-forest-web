import React, { FC, useEffect, useRef, useState } from 'react'
import s from './Wallet.module.scss'
import api from '@/api/api'
import useCoreContract from '@/hooks/useCoreContract'
import WalletMain from '@/components/App/layout-components/Header/NavBar/Wallet/WalletMain'
import WalletIcon from '@/components/App/layout-components/Header/NavBar/Wallet/WalletIcon'
import WalletBalance from '@/components/App/layout-components/Header/NavBar/Wallet/WalletBalance'
import WalletDropdown from '@/components/App/layout-components/Header/NavBar/Wallet/WalletDropdown'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'
import useMetamaskAuth from '@/hooks/useMetamaskAuth'
import { Category, MatomoEvent, trackEvent } from '@/utils/matomo'
import { AxiosResponse } from 'axios'
import { WalletState } from '@/types/wallet/WalletStateType'
import { Gender } from '@/types/Gender'
import { User } from '@/types/user'
import KebabDrowdown from "@/components/App/layout-components/Header/NavBar/Wallet/KebabDrowdown";

type UserWallet = User & { statusCode?: number, message?: string }
const VITE_NETWORK_ID = window.config.NETWORK_ID ?? '0x13881'

const Wallet: FC<{
  isOpenDropdown?: boolean | null,
  setIsOpenDropdown?: any,
  name: string,
  gender: Gender
  onWalletDataLoaded?: (
    address?: string | undefined,
    balance?: number | undefined,
    currency?: string | undefined,
    hasToken?: boolean | undefined) => void
}> =
  ({
    isOpenDropdown,
    setIsOpenDropdown,
    name,
    gender,
    onWalletDataLoaded
  }) => {
    const { getPLAIBalance, getCurrency, provider, walletConnected, getAddress } = useMetamaskWallet()
    const { login } = useMetamaskAuth()
    const { balanceOf } = useCoreContract()
    const [walletState, setWalletState] = useState<WalletState>('DISCONNECTED')
    const [userContractData, setUserContractData] = useState({
      currency: 'PLAI',
      address: '',
      balance: 0,
      hasToken: false
    })
    const dropdownRef = useRef(null)
    const [networkId, setNetworkId] = useState('')
    const [dropdownRefState, setDropdownRefState] = useState<React.MutableRefObject<null>>(dropdownRef)

    const getUserContractData = async () => {
      const currency = await getCurrency()
      const address = await getAddress()
      const hasTokenHex = await balanceOf(address)
      const balance = await getPLAIBalance()
      const hasToken = parseInt(hasTokenHex['_hex'], 16)
      const hasTokenResult = hasToken === 1

      setUserContractData({
        ...userContractData,
        address,
        balance,
        currency,
        hasToken: hasTokenResult
      })
      return { address, balance, currency, hasTokenResult }
    }

    useEffect(() => {
      if (walletConnected && walletState === 'DISCONNECTED' && name !== '') {
        getUserContractData().then((contractData) => {
          if (onWalletDataLoaded) {
            onWalletDataLoaded(
              contractData.address,
              contractData.balance,
              contractData.currency,
              contractData.hasTokenResult)
          }
        })
      }
    }, [name, walletState, walletConnected])

    const handleChainChanged = (networkId: string) => {
      setNetworkId(networkId)
    }

    const handleAccountChanged = async (accounts: Array<string>) => {
      if (accounts.length > 0) {
        await api.user.users.logout.request()
        setUserContractData({
          ...userContractData,
          address: accounts[accounts.length - 1]
        })
        window.location.reload()
      } else {
        setUserContractData({
          ...userContractData,
          address: 'disconnected'
        })
        if (onWalletDataLoaded) {
          onWalletDataLoaded('', 0, '', false)
        }
      }
    }

    useEffect(() => {
      if (window.ethereum) {
        window.ethereum.on('chainChanged', (networkId: string) => {
          handleChainChanged(networkId)
          if (networkId !== VITE_NETWORK_ID) {
            setIsOpenDropdown(true)
          }
        })
        window.ethereum.on('accountsChanged', (accounts: Array<string>) => handleAccountChanged(accounts))
        handleChainChanged(window.ethereum.networkVersion === '80001' ? VITE_NETWORK_ID : `0x${window.ethereum.networkVersion}`)
      }

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }, [provider])

    useEffect(() => {
      if (userContractData.address === '' ||
        userContractData.address === 'disconnected') {
        setWalletState('DISCONNECTED')
      }
      if (userContractData.address !== '' &&
        userContractData.address !== 'disconnected' &&
        name !== '') {
        setWalletState('CONNECTED')
      }
      if (name === 'userNotFound') {
        setWalletState('USER_NOT_FOUND')
      }
      if (networkId !== VITE_NETWORK_ID) {
        setWalletState('WRONG_NETWORK')
      }
    }, [networkId, userContractData.address, name])

    const handleLoginButtonClick = async () => {
      trackEvent(Category.Action, MatomoEvent.ButtonPressed, 'Login')
      try {
        await login(
          new URL(`${api.url}/${api.user.auth.nonce.url}`),
          new URL(`${api.url}/${api.user.auth.login.url}`)
        )

        const userData: AxiosResponse<UserWallet> = await api.user.users.profile.request()

        if (userData.status === 200) {
          setWalletState('CONNECTED')
        }

      } catch (e: any) {
        switch (e.message) {
          case 'User not found':
            setWalletState('USER_NOT_FOUND')
            break
          case 'Unauthorized':
            setWalletState('DISCONNECTED')
            break
          default:
            setWalletState('DISCONNECTED')
        }
      }
    }

    return (
      <div className={s.walletContainer}>
        {walletState !== 'DISCONNECTED' ?
          <div className={s.wallet}>
            <WalletIcon currentChain={networkId} gender={gender} />
            <WalletMain
              isOpenDropdown={isOpenDropdown}
              dropdownRef={dropdownRefState} name={
                walletState === 'WRONG_NETWORK' ? 'Hey,' :
                  walletState === 'USER_NOT_FOUND' ? 'No account' : name ?? ''}
              setModalVisibility={setIsOpenDropdown}
              address={userContractData.address}
            />
            <WalletBalance ticker={userContractData.currency}
              balance={walletState === 'CONNECTED' ? userContractData.balance : null} />
            <WalletDropdown onDropdownRefInitialized={(ref) => setDropdownRefState(ref)} type={
              networkId !== VITE_NETWORK_ID ? 'WRONG_NETWORK' :
                walletState === 'USER_NOT_FOUND' ? 'USER_NOT_FOUND' : 'SUCCESS'}
              isVisible={isOpenDropdown}
              setWalletState={setWalletState}
              networkId={networkId}
              address={userContractData.address} />
          </div> :
          <div onClick={() => handleLoginButtonClick()} className={s.loginBtn}>
            Connect
          </div>}
        <div className={s.kebabContainer}>
          <KebabDrowdown />
        </div>

      </div>
    )
  }

export default Wallet
