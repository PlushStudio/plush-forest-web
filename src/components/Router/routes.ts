const Routes = Object.freeze({
  index: '/',
} as const)

export type RoutesPaths = typeof Routes[keyof typeof Routes]

export default Routes
