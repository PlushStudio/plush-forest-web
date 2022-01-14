import React, {useContext, useEffect} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {PageNotFound} from './pages/PageNotFound'
import {AboutPage} from './pages/About'
import {PlantPage} from './pages/Planting'
import {TreeInfoPage} from './pages/TreeInfo'
import {userDetailsContext} from '@/context/UserDetailsProvider'
import api from '@/api/api'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'
import useMetamaskAuth from '@/hooks/useMetamaskAuth'
import {AxiosResponse} from 'axios'
import {User} from '@/types/user'
import {Page} from '@/Page'
import NoPlushTokenModal from "@/components/App/shared-components/NoPlushTokenModal/NoPlushTokenModal";

export const Routes = () => {
  const [userDetails, setUserDetails] = useContext(userDetailsContext)
  const {walletConnected} = useMetamaskWallet()
  const {login} = useMetamaskAuth()

  const setUserData = async () => {
    console.log('1')
    const userData: any = await api.user.users.profile.request()
    if (userData.status === 200) {
      setUserDetails({
        ...userDetails,
        name: userData.data.name,
        gender: userData.data.gender,
        childName: userData.data.childs[0].name,
      })
      console.log('2')
    } else {
      console.log('3')
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
      } catch (e: any) {
        console.log('4')
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
  }

  console.log(userDetails)
  useEffect(() => {
    if (walletConnected) {
      console.log('5')
      setUserData()
    }
  }, [walletConnected])

  return (
    <Router>
      {userDetails.hasToken !== false ?
        <Switch>
          <Route exact path='/'>
            <Page children={<AboutPage/>}/>
          </Route>
          <Route exact path='/about'>
            <Page children={<AboutPage/>}/>
          </Route>
          <Route exact path='/planting'>
            {userDetails.address !== '' && userDetails.address !== 'disconnected' ?
              <Page children={<PlantPage/>}/> :
              <Redirect to={'/about'}/>
            }
          </Route>
          <Route exact path='/token/:id/'>
            <Page children={<TreeInfoPage/>}/>
          </Route>
          <Route path='*'>
            <Page contentClass={'notFoundContentClass'} children={<PageNotFound/>}/>
          </Route>
          <Route path='/404'>
            <PageNotFound/>
          </Route>
        </Switch> : <Page children={<NoPlushTokenModal redirectTo={'https://plush.family/'}/>}/>}
    </Router>)
}
