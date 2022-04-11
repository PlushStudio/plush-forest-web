interface Window {
  config: Config,
  _paq: any,
}

interface Config {
  LANDING_URL: string,
  FAUCET_URL: string,
  PLUSH_WEBSITE_URL: string,
  API_URL?: string,
  PLUSH_CONTRACT_ADDRESS?: string,
  CORE_CONTRACT_ADDRESS?: string,
  TREE_CONTRACT_ADDRESS?: string,
  NETWORK_ID?: string,
  FOREST_CONTRACT_ADDRESS?: string,
  COIN_WALLETS_CONTRACT_ADDRESS?: string,
  SIGNUP_LINK: string,
  MATOMO_URL?: string,
  MATOMO_SITE_ID?: string
}
