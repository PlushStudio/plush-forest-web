import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound'
import { AboutPage } from './pages/About/About'
import { Planting } from './pages/Planting/Planting'
import { TreeInfoPage } from './pages/TreeInfo/TreeInfo'
import { Page } from '@/layouts/Page'
import routes from '@/Router/routes'

export const Routes = () => {
  return (
    <Switch>
      <Route exact path={routes.planting}>
        <Page withConnection>
          <Planting />
        </Page>
      </Route>
      <Route exact path={routes.index}>
        <Page>
          <AboutPage />
        </Page>
      </Route>
      <Route path={`${routes.token}/:id/`}>
        <Page>
          <TreeInfoPage />
        </Page>
      </Route>
      <Route>
        <PageNotFound />
      </Route>
      <Route exact path={routes.notFound}>
        <PageNotFound />
      </Route>
      <Route path='*'>
        <Page contentClass={'notFoundContentClass'}>
          <PageNotFound />
        </Page>
      </Route>
    </Switch>
  )
}
