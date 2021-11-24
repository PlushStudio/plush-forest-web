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

export const Routes = () => {
  const { isConnected, provider } = useMetamaskWallet()
  const [walletConnected, setWalletConnected] = useState(false)
  const [, setIsFetching] = useState(true)
  const [userDetails, setUserDetails] = useContext(userDetailsContext)

  useEffect(() => {
    isConnected().then(res => setWalletConnected(res))
  })

  const handleChainChanged = (networkId: string) => {
    setUserDetails({
      ...userDetails,
      currentChainId: networkId
    })
  }

  const handleAccountChanged = async (accounts: Array<string>) => {
    if (accounts.length === 0) {
      setUserDetails({
        ...userDetails,
        address: 'logouted'
      })
      await api.user.users.logout.request()
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (networkId: string) => handleChainChanged(networkId))
      window.ethereum.on('accountsChanged', (accounts: Array<string>) => handleAccountChanged(accounts))
    }
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChanged)
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [provider])

  useEffect(() => {
    if (walletConnected && userDetails.address === '') {
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

    handleChainChanged(window.ethereum.networkVersion)
  }, [walletConnected, userDetails.address])

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Index />
        </Route>
        <Route exact path='/about'>
          <AboutPage />
        </Route>
        <Route exact path='/planting'>
          <PlantPage />
        </Route>
        <Route exact path='/token/:id/'>
          <TreeInfoPage />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
        <Route path='/404'>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  )
}
