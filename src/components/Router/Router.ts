import React from 'react'
import { LocationState } from 'history'
import {
  Route as ReactRouterRoute,
  Link as ReactRouterLink,
  LinkProps,
} from 'react-router-dom'
import { RoutesPaths } from './routes'

/**
 * Restricted allowed route paths overwrite default any string. Only
 * those paths that are in the routes available.
 */
class Route<T extends {} = {}> extends ReactRouterRoute<T, RoutesPaths> {}

interface RestrictedLinkComponentParams<S = LocationState>
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<LinkProps<S> & { to: RoutesPaths }> &
      React.RefAttributes<HTMLAnchorElement>
  > {}
type RestrictedLink = <S = LocationState>(
  ...params: Parameters<RestrictedLinkComponentParams & { to: RoutesPaths }>
) => ReturnType<ReactRouterLink<S>>

const Link = ReactRouterLink as RestrictedLink

export * from 'react-router-dom'
export { Route, Link }
