import { mainnetChainId, mainnetNetworkId, testnetChainId, testnetNetworkId } from "@/constants";
import {Network} from "@ethersproject/providers";

export function ucFirst(str: string) {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export const cutWalletPublicId = (id: string) => {
  if (id) {
    return `${id.substr(0, 6)}...${id.substr(id.length - 4, 4)}`
  }
}

export const checkWrongNetwork = (VITE_NETWORK_ID: string, networkId: string) => {
  if (VITE_NETWORK_ID === '80001') {
    return networkId !== testnetNetworkId
  }
  if (VITE_NETWORK_ID === '137') {
    return networkId !== mainnetNetworkId
  }
  return true
}

export const getNetworkIdByChainId = (chainId: string) => {
  if (chainId === testnetChainId) {
    return testnetNetworkId
  }
  if (chainId === mainnetChainId) {
    return mainnetNetworkId
  }
  return 'Unsupported network'
}

export const getChainIdByNetworkId = (networkId: number | Network | undefined) => {
  if (networkId === Number(testnetNetworkId)) {
    return testnetChainId
  }
  if (networkId === Number(mainnetNetworkId)) {
    return mainnetChainId
  }
  return 'Unsupported chain'
}
