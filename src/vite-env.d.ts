/// <reference types="vite/client" />
interface Window {
  ethereum: any;
}

interface ImportMetaEnv {
  VITE_BASE_URL: string,
  VITE_CORE_CONTRACT_ADDRESS: string,
  VITE_FOREST_CONTRACT_ADDRESS: string,
  VITE_CORE_GET_TREE_CONTRACT_ADDRESS: string,
  VITE_PLUSH_CONTRACT_ADDRESS: string,
  VITE_SIGNUP_LINK: string,
  VITE_NETWORK_ID: string,
}
