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
    onWalletDataLoaded,
  }) => {
    const { getPLAIBalance, getCurrency, provider, walletConnected, getAddress } = useMetamaskWallet()
    const { login } = useMetamaskAuth()
    const { balanceOf } = useCoreContract()
    const [walletState, setWalletState] = useState<WalletState>('DISCONNECTED')
    const [userContractData, setUserContractData] = useState<any>({
      currency: 'PLAI',
      address: '',
      balance: 0,
      hasToken: false
    })
    const dropdownRef = useRef(null)
    const [networkId, setNetworkId] = useState<string>('')
    const [dropdownRefState, setDropdownRefState] = useState<React.MutableRefObject<null>>(dropdownRef)
    const VITE_NETWORK_ID = window.config.NETWORK_ID ?? '80001'

    const getUserContractData = async () => {
      console.log('10')
      if (networkId === VITE_NETWORK_ID) {
        console.log('11')
        const currency = await getCurrency()
        const address = await getAddress()
        const hasTokenHex = await balanceOf(address)
        const balance = await getPLAIBalance()
        const hasToken = parseInt(hasTokenHex['_hex'], 16)
        const hasTokenResult = hasToken === 1

        setUserContractData({ address, balance, currency, hasTokenResult })
        return { address, balance, currency, hasTokenResult }
      }
      return { address: '', balance: 0, currency: '', hasTokenResult: undefined }
    }

    useEffect(() => {
      console.log('test')
      if (name !== '' && name !== 'userNotFound') {
        console.log('12')
        const updateWalletNetwork = async () => {
          try {
            console.log('13')
            if (walletConnected) {
              console.log('14')
              const userContractData = await getUserContractData();
              console.log('15')
              if (onWalletDataLoaded) {
                console.log('16')
                onWalletDataLoaded(
                  userContractData?.address,
                  userContractData?.balance,
                  userContractData?.currency,
                  userContractData?.hasTokenResult)
              }
            }
          } catch (e) {
            console.log('17')
            console.log(e)
          }
        }

        console.log('18')
        updateWalletNetwork()
      }


    }, [walletState, name])

    const handleChainChanged = async (chainId: string) => {
      setNetworkId(chainId === '0x13881' ? VITE_NETWORK_ID : chainId)
    }

    const handleAccountChanged = async (accounts: Array<string>) => {
      console.log('19')
      if (accounts.length > 0) {
        await api.user.users.logout.request()
        setUserContractData({
          ...userContractData,
          address: accounts[accounts.length - 1]
        })
        window.location.reload()
      } else {
        console.log('20')
        setUserContractData({
          ...userContractData,
          address: 'disconnected'
        })
        if (onWalletDataLoaded) {
          console.log('21')
          onWalletDataLoaded('', undefined, '', undefined)
        }
      }
    }

    useEffect(() => {
      console.log('22')
      if (window.ethereum) {
        console.log('23')
        window.ethereum.on('chainChanged', (chainId: string) => {
          handleChainChanged(chainId)
          setIsOpenDropdown(chainId !== '0x13881')
        })
        window.ethereum.on('accountsChanged', (accounts: Array<string>) => handleAccountChanged(accounts))
        handleChainChanged(window.ethereum.chainId)
      }

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }, [provider, window.ethereum.chainId])

    useEffect(() => {
      console.log('24')
      if (userContractData.address === '' ||
        userContractData.address === 'disconnected') {
        console.log('25')
        setWalletState('DISCONNECTED')
      }
      if (userContractData.address !== '' &&
        userContractData.address !== 'disconnected' &&
        name !== '') {
        console.log('26')
        setWalletState('CONNECTED')
      }
      if (name === 'userNotFound') {
        console.log('27')
        setWalletState('USER_NOT_FOUND')
      }
      if (networkId !== '80001') {
        console.log('28')
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
        console.log('29')
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

    console.log(walletState)

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
              chainId={window.ethereum.chainId}
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
