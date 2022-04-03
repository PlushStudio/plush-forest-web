import React from "react";
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import routes from "@/Router/routes";

interface ProtectedRoute {
  component: React.FunctionComponent,
  props: RouteComponentProps
}
const ProtectedRoute = ({ component, ...props }: ProtectedRoute) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    isAuthenticated ?
      <Route {...props} path={routes.notFound} component={component} /> :
      <Redirect to={routes.index} />
  )
}
export default ProtectedRoute;
