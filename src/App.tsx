import React, {useEffect, useState} from 'react'
import '@/index.scss'
import '@/index.css'
import {Routes} from '@/Routes'
import {$user, getUserFx} from "@/store/user";
import {$auth, loginEvent, loginFx, logoutEvent, logoutFx} from "@/store/auth";
import {ApiError} from "@/services/api/types";
import {$walletStore, getMetamaskWalletFx} from "@/store/wallet";
import {useStore} from "effector-react";
import {useUpdateEffect} from "usehooks-ts";
import {CircleLoader} from "@/components/Loader/CircleLoader";
import {$forest} from "@/store/forest";

function App() {
  const walletStore = useStore($walletStore)
  const {isLoggedIn, isLoginStateRecieved} = useStore($auth)
  const user = useStore($user)
  const {treesCount, treesPrice} = useStore($forest)
  const [isMetamaskReady, setIsMetamaskReady] = useState<boolean>(true);
  const [isReady, setReady] = useState(false)

  const setInitialLoginState = async () => {
    try {
      await getUserFx()
      loginEvent()
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 401) {
          return
        }
      }

      console.error('Cannot get user. Is backend available?')
    }
  }

  const syncLoginState = async (account: string | null) => {
    setReady(false)

    if (!walletStore) {
      throw new Error('Wallet is undefined')
    }

    if (account) {
      try {
        if (!isLoggedIn) {
          await loginFx(walletStore.wallet)
          getUserFx()
        }

        if (user.address.length > 0 && account !== user.address) {
          await logoutEvent()
        }

        setReady(true)
      } catch (error: any) {
        if (error.statusCode === 404) {
          if (isLoggedIn) {
            await logoutFx()
          }
          logoutEvent()
          setReady(true)
        }
      }
    } else {
      if (isLoggedIn) {
        logoutFx()
      }
      logoutEvent()
      setReady(true)
    }
  }

  useUpdateEffect(() => {
    const sync = async () => {
      if (!walletStore) {
        return
      }

      const accounts = await walletStore.wallet.getAccounts()
      syncLoginState(accounts[0])
    }

    sync()
  }, [isLoginStateRecieved])

  useUpdateEffect(() => {
    if (!walletStore) {
      return
    }

    setInitialLoginState()

    const accountsChangedHandler = async (accounts: string[]) => {
      const currentAccountConnected = accounts.find((account) => account === user.address)

      if (!currentAccountConnected) {
      }

      syncLoginState(accounts[0])
    }

    walletStore.wallet.addAccountsChangedListener(accountsChangedHandler)

    return () => {
      if (!walletStore.wallet) {
        return
      }

      walletStore.wallet.removeAccountsChangedListener(accountsChangedHandler)
    }
  }, [walletStore])


  useEffect(() => {
    getMetamaskWalletFx()
  }, [])

  return (
     isReady ?
        <Routes/>
     : <CircleLoader/>
  )
}

export default App
