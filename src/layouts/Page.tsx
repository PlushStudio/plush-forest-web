import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { Header } from '@/components/Header/Header'
import { WalletState } from '../../lib/components/Wallet/Wallet'
import { useStore } from 'effector-react'
import { $user } from '@/store/user'
import { $walletStore } from '@/store/wallet'
import MetamaskWallet from '@/metamask/wallet/metamaskWallet'
import { CircleLoader } from '@/components/Loader/CircleLoader'
import { setCurrencyEvt, setIsOpenMenuDropdownEvt, setSafeBalanceEvt, setUserBalanceEvt } from '@/store/app'
import { UserTokens } from '@/types/UserTokens'
import api from '@/api/api'
import routes from '@/Router/routes'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'

type Props = {
  children: ReactNode
  headerMessage?: string
  withConnection?: boolean,
  headerComponent?: ReactNode
  footerComponent?: ReactNode
  contentClass?: string
}

export const Page = (props: Props) => {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [actualNetworkId, setActualNetworkId] = useState<string>('')
  const [dataFetched, setDataFetched] = useState<boolean>(false)
  const [forestTokenChecked, setForestTokenChecked] = useState<boolean>(false)
  const [walletState, setWalletState] = useState<WalletState>('DISCONNECTED')
  const [balance, setBalance] = useState<number>(0)
  const [currency, setCurrency] = useState<string>('')

  const location = useLocation()
  const history = useHistory()
  const user = useStore($user)
  const walletStore = useStore($walletStore)
  const [isMounted, setIsMounted] = useState<boolean>(true)

  const getExpectedNetworkName = () => {
    return MetamaskWallet.getNetworkById(window.config.NETWORK_ID ?? import.meta.env.VITE_NETWORK_ID).name
  }

  const getActualNetworkName = () => {
    return MetamaskWallet.getNetworkById(actualNetworkId).name
  }

  useEffect(() => {
    if (props.withConnection) {
      checkUserForestToken()
    }
  }, [location.pathname])

  const connectWallet = async () => {
    if (!walletStore) {
      throw new Error('Wallet is undefined')
    }

    try {
      await walletStore.wallet.connect()
    } catch (error: any) {
      console.error(error)
    }
  }

  const childName = useMemo(() => {
    if (!user || user.childs.length < 1) {
      return ''
    }

    return user.childs[0].name
  }, [user])

  const childGender = useMemo(() => {
    if (!user || user.childs.length < 1) {
      return 'FEMALE'
    }

    return user.childs[0].gender
  }, [user])

  const switchWalletNetwork = async () => {
    if (!walletStore) {
      throw new Error('Wallet is undefined')
    }

    await walletStore.wallet.switchNetwork(window.config.NETWORK_ID ?? import.meta.env.VITE_NETWORK_ID)
  }

  const switchWalletAccount = async () => {
    if (!walletStore) {
      throw new Error('Wallet is undefined')
    }

    await walletStore.wallet.switchAccount()
  }

  const getPolygonScanLink = (address: string) => {
    return `https://mumbai.polygonscan.com/address/${address}`
  }

  const openExplorer = async () => {
    window.open(getPolygonScanLink(user.address), '_blank')
  }

  const checkUserForestToken = async () => {
    setDataFetched(false)
    try {
      const myTokens: UserTokens = await api.user.users.tokens.request()
      if (myTokens.tokens.length > 0) {
        history.push(`${routes.token}/${myTokens.tokens[0].token_id}`)
      }
    } catch (e: any) {
      console.error(e.message)
    } finally {
      setDataFetched(true)
      setForestTokenChecked(true)
    }
  }

  const fetchData = async (isMounted: boolean) => {
    if (!walletStore) {
      throw new Error('Wallet is undefined')
    }

    const isWalletConnected = await walletStore.wallet.isConnected()

    if (!isWalletConnected) {
      if (isMounted) {
        setWalletState('DISCONNECTED')
        setDataFetched(true)
      }
      return
    }

    const network = walletStore.wallet.getCurrentNetwork()
    if (isMounted) {
      setActualNetworkId(network.id)
    }

    if (network.name !== getExpectedNetworkName() && isMounted) {
      setWalletState('WRONG_NETWORK')
      setIsOpenMenuDropdownEvt(true)
      setDataFetched(true)
      return
    }

    const address = await walletStore.wallet.getAddress()
    const safeBalance = await walletStore.plushCoinWalletsContractManager.getBalance(address)
    const userBalance = await walletStore.plushContractManager.getBalance(address)
    const currency = await walletStore.plushContractManager.getCurrency()

    if (isMounted) {
      setWalletAddress(address)
      setBalance(safeBalance)
      setCurrency(currency)

      setSafeBalanceEvt(safeBalance)
      setUserBalanceEvt(userBalance)
      setCurrencyEvt(currency)
    }

    if (!user.id) {
      setWalletState('USER_NOT_FOUND')
      setDataFetched(true)
      setIsOpenMenuDropdownEvt(true)
      return
    }

    if (isMounted) {
      setWalletState('USER_FOUND')
      setDataFetched(true)
      setIsOpenMenuDropdownEvt(true)
    }

    if (props.withConnection) {
      setDataFetched(forestTokenChecked)
    }
  }

  const handleNetworkChanged = () => {
    fetchData(isMounted)
  }

  const handleAccountChanged = async () => {
    fetchData(isMounted)
  }

  const registerAccount = () => {
    window.location.href = window.config.SIGNUP_URL ?? import.meta.env.VITE_SIGNUP_URL
  }

  useEffect(() => {
    setIsMounted(true)

    if (!walletStore) {
      return
    }

    fetchData(isMounted)
    walletStore.wallet.addNetworkChangedListener(handleNetworkChanged)
    walletStore.wallet.addAccountsChangedListener(handleAccountChanged)

    return () => {
      setIsMounted(false)
      walletStore.wallet.removeNetworkChangedListener(handleNetworkChanged)
      walletStore.wallet.removeAccountsChangedListener(handleAccountChanged)
    }
  }, [walletStore, user, forestTokenChecked])

  return (
    dataFetched
      ? <>
        <Header
          walletProps={{
            state: walletState,
            address: walletAddress,
            name: childName,
            gender: childGender,
            actualNetworkName: getActualNetworkName(),
            expectedNetworkName: getExpectedNetworkName(),
            connect: connectWallet,
            switchNetwork: switchWalletNetwork,
            register: registerAccount,
            switchAccount: switchWalletAccount,
            openExplorer: openExplorer
          }}
          balance={balance}
          currency={currency} />
        {props.headerComponent}
        {
          walletState !== 'WRONG_NETWORK'
            ? props.children
            : <CircleLoader />
        }
        {props.footerComponent}
      </>
      : <CircleLoader />
  )
}
