import React from "react";
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import routes from "@/Router/routes";
import {useStore} from "effector-react";
import {$auth} from "@/store/auth";

interface ProtectedRoute {
  component: any,
  path: string
  props?: RouteComponentProps,
}
const ProtectedRoute = ({ path, component, ...props }: ProtectedRoute) => {
  const { isLoggedIn } = useStore($auth)

  return (
    isLoggedIn ?
      <Route {...props} path={path} component={component} /> :
      <Redirect to={routes.index} />
  )
}
export default ProtectedRoute;
