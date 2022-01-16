import { mumbaiMainnetChainId, mumbaiMainnetNetworkId, mumbaiTestnetChainId, mumbaiTestnetNetworkId } from "@/constants";

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
    return networkId !== mumbaiTestnetNetworkId
  }
  if (VITE_NETWORK_ID === '137') {
    return networkId !== mumbaiMainnetNetworkId
  }
  return true
}

export const getNetworkIdByChainId = (chainId: string) => {
  if (chainId === mumbaiTestnetChainId) {
    return mumbaiTestnetNetworkId
  }
  if (chainId === mumbaiMainnetChainId) {
    return mumbaiMainnetNetworkId
  }
  return 'Unsupported network'
}