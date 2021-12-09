import React, {FC, useEffect, useState} from 'react'
import WalletIcon from '@/components/App/layout-components/Header/NavBar/Wallet/WalletIcon'
import WalletMain from '@/components/App/layout-components/Header/NavBar/Wallet/WalletMain'
import s from './Wallet.module.scss'
import WalletBalance from '@/components/App/layout-components/Header/NavBar/Wallet/WalletBalance'
import WalletDropdown from '@/components/App/layout-components/Header/NavBar/Wallet/WalletDropdown'
import { Gender } from '@/types/Gender'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'
import api from "@/api/api";
import {Category, MatomoEvent, trackEvent} from "@/utils/matomo";
import {User} from "@/types/user";
import useMetamaskAuth from "@/hooks/useMetamaskAuth";
import kebabIcon from '@/assets/images/wallet/32-px-1-outlined-kebab-horizontal.svg'
import {AxiosResponse} from "axios";

interface Wallet {
  name: string,
  gender: Gender
}

type UserWallet = User & { statusCode?: number, message?: string}

const Wallet: FC<{ isOpenDropdown: boolean | null, setIsOpenDropdown: any}> = ({ isOpenDropdown, setIsOpenDropdown }) => {
  const { getPLAIBalance, getTicker, provider, walletConnected, getAddress } = useMetamaskWallet()
  const { login } = useMetamaskAuth()
  const [walletState, setWalletState] = useState('disconnected')
  const [balance, setBalance] = useState<number | null>(0)
  const [ticker, setTicker] = useState('')
  const [networkId, setNetworkId] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [gender, setGender] = useState<Gender>('MALE')

  useEffect(() => {
    if (address === '' ||
        address === 'disconnected') {
      setWalletState('disconnected')
    }
    if (address && address !== '' &&
        address !== 'disconnected' &&
        name !== '') {
      setWalletState('connected')
    }
    if (networkId !== '0x4') {
      setWalletState('wrongNetwork')
    }
  }, [networkId, address])

  useEffect(() => {
    if (walletConnected) {
      (async function() {
        setAddress(await getAddress())
        await setPLAIBalance();
        await getUserData()
      })()
    }
  }, [networkId, name, walletConnected])

  const setPLAIBalance = async () => {
    const ticker = await getTicker()
    getPLAIBalance().then((balance: number) => {
      setBalance(balance)
      setTicker(ticker)
    })
  }

  const getUserData = async () => {
    const userData: AxiosResponse<UserWallet> = await api.user.users.profile.request()
    if (userData.status === 200) {
      setName(userData.data.name)
      setGender(userData.data.gender)
      setWalletState('connected')
      return
    }
      switch (userData.data.message) {
        case 'User not found':
          setWalletState('userNotFound')
          break
        case 'Unauthorized':
          setWalletState('disconnected')
          await handleLoginButtonClick()
          break;
        default:
          setWalletState('disconnected')
      }

  }

  const handleChainChanged = (networkId: string) => {
    setNetworkId(networkId)
  }

  const handleAccountChanged = async (accounts: Array<string>) => {
    if (accounts.length > 0) {
      await api.user.users.logout.request()
      window.location.reload()
    } else {
      setAddress('disconnected')
    }
      setAddress(accounts[accounts.length - 1])
      await handleLoginButtonClick()
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (networkId: string) => {
        handleChainChanged(networkId)
        setIsOpenDropdown(networkId !== '0x4')
      })
      window.ethereum.on('accountsChanged', (accounts: Array<string>) => handleAccountChanged(accounts))
    }

    handleChainChanged(`0x${window.ethereum.networkVersion}`)

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChanged)
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [provider])

  const handleLoginButtonClick = async () => {
    trackEvent(Category.Action, MatomoEvent.ButtonPressed, 'Login');
    try {
      await login(
          new URL(`${api.url}/${api.user.auth.nonce.url}`),
          new URL(`${api.url}/${api.user.auth.login.url}`)
      )
      await getUserData()
    } catch(e) {
      if (e.message === 'User not found') {
        setWalletState('userNotFound')
      }
    }
  }

  return (
      <div className={s.walletContainer}>
        {walletState !== 'disconnected' ?
          <div className={s.wallet}>
            <WalletIcon currentChain={networkId} gender={walletState !== 'userNotFound' ? gender : ''} />
            <WalletMain name={
              walletState === 'wrongNetwork' ? 'Hey,' :
              walletState === 'userNotFound' ? 'No account' : name ?? 'undefined'}
              setModalVisibility={setIsOpenDropdown}
              modalVisibility={isOpenDropdown}
              address={address}
            />
            <WalletBalance ticker={ticker} balance={walletState === 'connected' ? balance : null} />
            <WalletDropdown type={
              networkId !== '0x4' ? 'networkError' :
              walletState === 'userNotFound' ? 'userNotFound' : 'success'}
              isVisible={isOpenDropdown}
              address={address} />
          </div> :
          <div onClick={() => handleLoginButtonClick()} className={s.loginBtn}>
            Connect
          </div>}
        <div className={s.kebab}>
          <img alt={"kebab button"} src={kebabIcon}/>
        </div>
      </div>
  )
}

export default Wallet
