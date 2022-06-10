const Routes = Object.freeze({
  index: '/',
  planting: '/planting',
  token: '/token/:id',
  getLifespanToken: '/get-lifespan-token',
  notFound: '/404'
} as const)

export type RoutesPaths = typeof Routes[keyof typeof Routes]

export default Routes
