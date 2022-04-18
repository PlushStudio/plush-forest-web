import { JsonRpcSigner, Web3Provider, ExternalProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { EthereumNetwork, networks } from './networks'
import MetaMaskOnboarding from '@metamask/onboarding'
import detectEthereumProvider from '@metamask/detect-provider'

class MetamaskWallet {
  readonly provider: Web3Provider
  readonly signer: JsonRpcSigner

  constructor (provider: Web3Provider) {
    this.provider = provider
    this.signer = this.provider.getSigner()
  }

  static detectProvider = async (): Promise<Web3Provider> => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      new MetaMaskOnboarding().startOnboarding()
    }

    try {
      const ethereumMetamaskGlobalObject = await detectEthereumProvider({
        mustBeMetaMask: true,
        silent: true
      }) as ExternalProvider

      if (ethereumMetamaskGlobalObject) {
        // Explanation why any param is passed: https://github.com/ethers-io/ethers.js/issues/866
        return new ethers.providers.Web3Provider(ethereumMetamaskGlobalObject, 'any')
      }

      throw new Error('Cannot detect provider. Check window.ethereum is available.')
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static getNetworkById = (id: string): EthereumNetwork => {
    for (let i = 0; i < networks.length; i++) {
      if (networks[i].id === id) {
        return networks[i]
      }
    }

    return { id: id, name: 'Unknown network' }
  }

  isConnected = async () => {
    try {
      await this.signer.getAddress()
      return true
    } catch {
      return false
    }
  }

  connect = async (): Promise<void> => {
    this.provider.send('eth_requestAccounts', [])
  }

  getCurrentNetwork = (): EthereumNetwork => {
    const id = (window.ethereum as any).networkVersion.toString()
    let name = 'Unknown network'

    for (let i = 0; i < networks.length; i++) {
      if (networks[i].id === id) {
        name = networks[i].name
        break
      }
    }

    return { id, name }
  }

  signMessage = async (message: string): Promise<string> => {
    return await this.signer.signMessage(message)
  }

  switchNetwork = async (id: string) => {
    (window.ethereum as any).request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ethers.utils.hexValue(ethers.utils.hexlify(Number(id))) }]
    })
  }

  switchAccount = async () => {
    (window.ethereum as any).request({
      method: 'wallet_requestPermissions',
      params: [{
        eth_accounts: {}
      }]
    })
  }

  getAddress = async (): Promise<string> => {
    return this.signer.getAddress()
  }

  getAccounts = async (): Promise<Array<string>> => {
    return this.provider.listAccounts()
  }

  addAccountsChangedListener = (listener: (accounts: Array<string>) => void) => {
    (window.ethereum as any).on('accountsChanged', (accounts: Array<string>) => {
      listener(accounts)
    })
  }

  addNetworkChangedListener = (listener: (networkId: string) => void) => {
    (window.ethereum as any).on('chainChanged', (networkId: string) => {
      const decimalId = parseInt(networkId, 16).toString()
      listener(decimalId)
    })
  }

  removeAccountsChangedListener = (listener: (accounts: Array<string>) => void) => {
    (window.ethereum as any).removeListener('accountsChanged', listener)
  }

  removeNetworkChangedListener = (listener: (networkIs: string) => void) => {
    (window.ethereum as any).removeListener('chainChanged', listener)
  }
}

export default MetamaskWallet
