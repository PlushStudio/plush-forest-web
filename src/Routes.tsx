import React, { useContext, useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
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
import { Gender } from "@/types/Gender";
import {testnetNetworkId} from "@/constants";

export const Routes = () => {
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const [forestTokenId, setForestTokenId] = useState<string>('')
  const { walletConnected } = useMetamaskWallet()
  const { login } = useMetamaskAuth()

  const initialLogin = async () => {
    try {
      await login(
        new URL(`${api.url}/${api.user.auth.nonce.url}`),
        new URL(`${api.url}/${api.user.auth.login.url}`)
      )
      const userData: AxiosResponse<User> = await api.user.users.profile.request()
      const myTokens: UserTokens = await api.user.users.tokens.request()

      if (userData.status === 200) {
        setUserDetails({
          ...userDetails,
          name: userData.data.name,
          gender: userData.data.gender,
          childName: userData.data.childs[0].name,
          tokenId: myTokens.tokens[0].token_id
        })
      }
      setForestTokenId(myTokens.tokens[0].token_id)
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

  interface UserData {
    childs: [{
      name: string
    }]
    address: string,
    city?: string | null
    country?: string
    dateOfBirth?: string
    email?: string
    gender?: Gender
    id?: string
    isActive?: boolean
    name?: string
    role?: string
    state?: string
  }

  const setUserData = async () => {
    const userData: AxiosResponse<UserData> = await api.user.users.profile.request()
    const myTokens: UserTokens = await api.user.users.tokens.request()

    if (myTokens?.tokens?.length > 0) {
      setForestTokenId(myTokens.tokens[0].token_id)
    }

    if (userData.status === 200) {
      setUserDetails({
        ...userDetails,
        name: userData.data.name,
        gender: userData.data.gender,
        childName: userData?.data.childs[0].name,
        tokenId: myTokens.tokens[0]?.token_id
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

  console.log(userDetails.networkId)
  return (
    <Switch>
      <Route path='/token/:id/'>
        <Page children={<TreeInfoPage />} />
      </Route>
      {forestTokenId.length > 0 && userDetails.networkId === Number(testnetNetworkId) && <Redirect to={`${routes.token}/${forestTokenId}`} />}
      <Route exact path={routes.index}>
        <Page children={<AboutPage />} />
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
