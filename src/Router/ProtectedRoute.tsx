import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import routes from "@/Router/routes";
import { useStore } from "effector-react";
import { $auth } from "@/store/auth";
import { $forest } from "@/store/forest";
import { CircleLoader } from "@/components/Loader/CircleLoader";

interface ProtectedRoute {
  component: any,
  path: string
  props?: RouteComponentProps,
}

const ProtectedRoute = ({ path, component, ...props }: ProtectedRoute) => {
  const { isLoggedIn, isLoginStateRecieved } = useStore($auth)
  const { treesPrice, treesCount } = useStore($forest)
  const [isBlockchainDataReady, setIsBlockchainDataReady] = useState<boolean>(false)
  const [isAuthReady, setIsAuthReady] = useState<boolean | undefined>(undefined)


  useEffect(() => {
    if (isLoginStateRecieved) {
      setIsAuthReady(true)
    }
  }, [isLoginStateRecieved])

  return (
    isAuthReady ?
      isLoggedIn ?
        <Route {...props} path={path}>
          {component}
        </Route> : <Redirect to={routes.index} />
      : <CircleLoader />
  )
}
export default ProtectedRoute;
