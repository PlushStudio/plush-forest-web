import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound'
import { AboutPage } from './pages/About/About'
import { Planting } from './pages/Planting/Planting'
import { TreeInfoPage } from './pages/TreeInfo/TreeInfo'
import { Page } from '@/layouts/Page'
import routes from "@/Router/routes";
import ProtectedRoute from "@/Router/ProtectedRoute";

export const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path={routes.planting} component={<Page children={<Planting />} />}/>
      <Route exact path={routes.index}>
        <Page children={<AboutPage />} />
      </Route>
      <Route path={`${routes.token}/:id/`}>
        <Page children={<TreeInfoPage />} />
      </Route>
      <Route children={<PageNotFound />} />
      <Route exact path={routes.notFound}>
        <PageNotFound />
      </Route>
      <Route path='*'>
        <Page contentClass={'notFoundContentClass'} children={<PageNotFound />} />
      </Route>
    </Switch>
  )
}
