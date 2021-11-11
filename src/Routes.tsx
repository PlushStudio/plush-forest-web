import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound'
import { AboutPage } from './pages/About'
import { PlantPage } from './pages/Planting'
import Index from './pages/index/Index'
import { TreeInfoPage } from './pages/TreeInfo'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'
import { User } from '@/types/user'
import api from '@/api/api'
import { Header } from '@/components/App/layout-components/Header/Header'

export const Routes = () => {
  const { isConnected, provider } = useMetamaskWallet()
  const [walletConnected, setWalletConnected] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [userDetails, setUserDetails] = useContext(userDetailsContext)


  useEffect(() => {
    isConnected().then(res => setWalletConnected(res))
  })

  const handleChainChanged = (networkId: string) => {
    setUserDetails({
      ...userDetails,
      currentChainId: Number(networkId)
    })
  }
  const handleAccountChanged = (accounts: Array<string>) => {
    accounts.length === 0 && setUserDetails({
      ...userDetails,
      address: ''
    })
  }

  useEffect(() => {
    // @ts-ignore
    handleChainChanged(window.ethereum.networkVersion)
  }, [])

  useEffect(() => {
    if (window.ethereum) {
      //@ts-ignore
      window.ethereum.on('chainChanged', (networkId: string) => handleChainChanged(networkId))
      //@ts-ignore
      window.ethereum.on('accountsChanged', (accounts: Array<string>) => handleAccountChanged(accounts))
    }

    setWalletConnected(true)
    return () => {
      // @ts-ignore
      window.ethereum.removeListener('accountsChanged', handleAccountChanged)
      // @ts-ignore
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [provider])

  useEffect(() => {
    if (walletConnected) {
      api.user.users.profile.request()
        .then(response => {
          return response.data
        }).then((r: User) => {
        setUserDetails({
          ...userDetails,
          name: r.name,
          address: r.address,
          childName: r.childs[0].name
        })
      }).finally(() => setIsFetching(false))
    } else {
      setIsFetching(false)
    }
  }, [walletConnected, userDetails.address])

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Index />
        </Route>
        <Route exact path='/about'>
          <AboutPage />
        </Route>`
        <Route exact path='/planting'>
          {userDetails.address !== ''
          && userDetails.currentChainId === 4 ?
            <PlantPage /> : <Header />}
        </Route>
        <Route exact path='/tree/:id/:currentLocation'>
          <TreeInfoPage />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  )
}
