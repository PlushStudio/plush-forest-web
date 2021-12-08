import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound'
import { AboutPage } from './pages/About'
import { PlantPage } from './pages/Planting'
import Index from './pages/index/Index'
import { TreeInfoPage } from './pages/TreeInfo'
import useCoreContract from "@/hooks/useCoreContract";
import {userDetailsContext} from "@/context/UserDetailsProvider";

export const Routes = () => {
  const { balanceOf } = useCoreContract()
  const [userDetails, setUserDetails] = useContext(userDetailsContext)

  useEffect(() => {
    const checkToken = async () => {
      const hasTokenHex = await balanceOf('0x4c49Dc38c549F888fA8AB7736a98EB118fAB6FE7')
      const hasTokenResult = parseInt(hasTokenHex['_hex'], 16)
      setUserDetails({
        ...userDetails,
        hasToken: hasTokenResult === 1
      })
    }
    checkToken()
  }, [userDetails.hasToken])

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
            <PageNotFound/>
          </Route>
      </Switch>
    </Router>)
}
