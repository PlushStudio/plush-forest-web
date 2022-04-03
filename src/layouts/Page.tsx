import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { Header } from '@/components/Header/Header'
import { WalletState } from "@/lib/components/Wallet/Wallet";
import { useStore } from "effector-react";
import { $user } from "@/store/user";
import { $walletStore } from "@/store/wallet";
import MetamaskWallet from "@/metamask/wallet/metamaskWallet";
import { CircleLoader } from "@/components/Loader/CircleLoader";
import { $forest, getForestDataFx } from "@/store/forest";

type Props = {
  children: ReactNode
  headerMessage?: string
  headerComponent?: ReactNode
  footerComponent?: ReactNode
  contentClass?: string
}

export const Page = (props: Props) => {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [actualNetworkId, setActualNetworkId] = useState<string>('')
  const [dataFetched, setDataFetched] = useState<boolean>(false)
  const [walletState, setWalletState] = useState<WalletState>('DISCONNECTED')
  const [balance, setBalance] = useState(0)
  const [currency, setCurrency] = useState('')

  const user = useStore($user)
  const walletStore = useStore($walletStore)
  const { selectedTreeType, treesPrice, treesCount } = useStore($forest)
  const [isMounted, setIsMounted] = useState(true)

  const getExpectedNetworkName = () => {
    return MetamaskWallet.getNetworkById(window.config.NETWORK_ID ?? import.meta.env.VITE_NETWORK_ID).name
  }

  const getActualNetworkName = () => {
    return MetamaskWallet.getNetworkById(actualNetworkId).name
  }

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
      setDataFetched(true)
      return
    }

    const address = await walletStore.wallet.getAddress()
    const balance = await walletStore.plushCoinWalletsContractManager.getBalance(address)
    const currency = await walletStore.plushContractManager.getCurrency()
    getForestDataFx(walletStore)

    if (isMounted) {
      setWalletAddress(address)
      setBalance(balance)
      setCurrency(currency)
    }

    if (!user.id) {
      setWalletState('USER_NOT_FOUND')
      setDataFetched(true)
      return
    }

    if (isMounted) {
      setWalletState('USER_FOUND')
      setDataFetched(true)
    }
  }

  const handleNetworkChanged = () => {
    fetchData(isMounted)
  }

  const handleAccountChanged = async () => {
    fetchData(isMounted)
  }

  const registerAccount = () => {
    window.location.href = window.config.LANDING_URL ?? import.meta.env.VITE_LANDING_URL
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
  }, [walletStore, user])

  return (
    dataFetched ?
      <>
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
        {!!props.headerComponent &&
          props.headerComponent
        }
        {props.children}
        {!!props.footerComponent &&
          props.footerComponent
        }
      </> : <CircleLoader />)
}
