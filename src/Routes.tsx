import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound'
import { AboutPage } from './pages/About'
import { PlantPage } from './pages/Planting'
import Index from './pages/index/Index'
import { TreeInfoPage } from './pages/TreeInfo'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'
import { Network } from '@ethersproject/providers'
import { User } from '@/types/user'
import api from '@/api/api'

export const Routes = () => {
  const { isConnected, provider } = useMetamaskWallet()
  const [walletConnected, setWalletConnected] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [userDetails, setUserDetails] = useContext(userDetailsContext)


  useEffect(() => {
    isConnected().then(res => setWalletConnected(res))
  })

  useEffect(() => {
    const setNetwork = async () => {
      const networkResponse: Network | undefined = await provider?.getNetwork()
      if (networkResponse) {
        setUserDetails({
          ...userDetails,
          currentChainId: networkResponse.chainId
        })
      }
    }
    setNetwork()
  }, [provider])

  useEffect(() => {
    if (window.ethereum) {
      //@ts-ignore
      window.ethereum.on('chainChanged', function(networkId: string) {
        setUserDetails({
          ...userDetails,
          currentChainId: Number(networkId)
        })
      })

      //@ts-ignore
      window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
        accounts.length === 0 && setUserDetails({
          ...userDetails,
          address: ''
        })
      })
    }
  })

  useEffect(() => {
    if (walletConnected) {
      api.user.users.profile.request()
        .then(response => {
          return response.data
        }).then((r: User) => {
        console.log(r)
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
  }, [walletConnected, isFetching])

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
          {userDetails.address ?
            <PlantPage /> : <div className="notFoundContainer">User is not authorized</div>}
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
