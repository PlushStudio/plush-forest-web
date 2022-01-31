/// <reference types="vite/client" />
interface Window {
  ethereum: any;
}

interface ImportMetaEnv {
  VITE_FOREST_CONTRACT_ADDRESS: string,
  VITE_SIGNUP_LINK: string,
  VITE_NETWORK_ID: string
}