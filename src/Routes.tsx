import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound'
import { AboutPage } from './pages/About'
import { PlantPage } from './pages/Planting'
import { TreeInfoPage } from './pages/TreeInfo'
import { userDetailsContext } from '@/context/UserDetailsProvider'
import api from '@/api/api'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'
import useMetamaskAuth from '@/hooks/useMetamaskAuth'
import { AxiosResponse } from 'axios'
import { User } from '@/types/user'
import { Page } from '@/Page'
import routes from "@/components/Router/routes";
import { UserTokens } from "@/types/UserTokens";
import { useHistory } from "react-router";

export const Routes = () => {
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const [forestTokenId, setForestTokenId] = useState<string>('')
  const { walletConnected } = useMetamaskWallet()
  const { login } = useMetamaskAuth()
  const history = useHistory()

  const initialLogin = async () => {
    try {
      await login(
        new URL(`${api.url}/${api.user.auth.nonce.url}`),
        new URL(`${api.url}/${api.user.auth.login.url}`)
      )
      const userData: AxiosResponse<User> = await api.user.users.profile.request()

      if (userData.status === 200) {
        setUserDetails({
          ...userDetails,
          name: userData.data.name,
          gender: userData.data.gender,
          childName: userData.data.childs[0].name
        })
      }

      const myTokens: UserTokens = await api.user.users.tokens.request()
      setForestTokenId(myTokens.result[0].token_id)
      history.push(`/token/${myTokens.result[0].token_id}`)
    } catch (e: any) {
      switch (e.message) {
        case 'User not found':
          setUserDetails({
            ...userDetails,
            name: 'userNotFound'
          })
          break
      }
    }
  }

  const setUserData = async () => {
    const userData: any = await api.user.users.profile.request()
    if (userData.status === 200) {
      setUserDetails({
        ...userDetails,
        name: userData.data.name,
        gender: userData.data.gender,
        childName: userData.data.childs[0].name,
      })
    } else {
      await initialLogin()
    }
  }

  useEffect(() => {
    if (walletConnected) {
      setUserData()
    }
  }, [walletConnected])

  return (

    <Switch>
      <Route exact path={routes.index}>
        <Page children={<AboutPage />} />
      </Route>
      <Route path='/token/:id/'>
        <Page children={<TreeInfoPage />} />
      </Route>
      <Route exact path={routes.planting}>
        {userDetails.address !== 'disconnected' ?
          <Page children={<PlantPage />} /> :
          <Redirect to={routes.index} />
        }
      </Route>
      <Route exact path={routes.notFound}>
        <PageNotFound />
      </Route>
      <Route path='*'>
        <Page contentClass={'notFoundContentClass'} children={<PageNotFound />} />
      </Route>
    </Switch>
  )
}
