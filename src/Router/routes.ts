const Routes = Object.freeze({
  index: '/',
  planting: '/planting',
  token: '/token',
  notFound: '/404'
} as const)

export type RoutesPaths = typeof Routes[keyof typeof Routes]

export default Routes
