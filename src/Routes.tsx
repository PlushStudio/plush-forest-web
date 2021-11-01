import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound'
import { AboutPage } from './pages/About'
import { PlantPage } from './pages/Planting'
import Index from './pages/index/Index'
import { TreeInfoPage } from './pages/TreeInfo'
import UserDetailsProvider from '@/context/UserDetailsProvider'

export const Routes = () => (
  <Router>
    <Switch>
      <UserDetailsProvider>
        <Route exact path='/'>
          <Index />
        </Route>
        <Route exact path='/about'>
          <AboutPage />
        </Route>
        <Route exact path='/planting'>
          <PlantPage />
        </Route>
        <Route exact path='/tree/:id/:currentLocation'>
          <TreeInfoPage />
        </Route>
      </UserDetailsProvider>
      <Route path='*'>
        <PageNotFound />
      </Route>
    </Switch>
  </Router>
)