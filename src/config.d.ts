interface Window {
  config: Config,
  _paq: any,
}

interface Config {
  API_URL?: string
  PLAI_CONTRACT_ADDRESS?: string
  CORE_CONTRACT_ADDRESS?: string
  CORE_GET_TREE_CONTRACT_ADDRESS?: string
  NETWORK_ID?: string,
  MATOMO_URL?: string,
  MATOMO_SITE_ID?: string
}
