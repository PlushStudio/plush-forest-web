enum Category {
  Action = 'Action',
  Error = 'Error',
  Info = 'Info'
}

enum MatomoEvent {
  PageVisited = 'Page visited',
  ButtonPressed = 'Button pressed',
  ErrorShown = 'Error shown'
}

const trackEvent = (category: Category, event: MatomoEvent, name?: string) => {
  window._paq.push(['trackEvent', category, event, name])
}

export { trackEvent, Category, MatomoEvent }
