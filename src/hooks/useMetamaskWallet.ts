import { JsonRpcSigner } from '@ethersproject/providers'
import MetaMaskOnboarding from '@metamask/onboarding'
import { ethers } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import usePLUSHContract from "@/hooks/usePLUSHContract";

export const errors = {
  walletNotInstalled: {
    code: 1,
    message: 'wallet is not installed'
  },
  walletNotConnected: {
    code: 2,
    message: 'wallet is not connected'
  },
  signingFailed: {
    code: 3,
    message: 'Signing was failed'
  }
}

const useMetamaskWallet = () => {
  const onboarding = useRef<MetaMaskOnboarding>()
  const [signer, setSigner] = useState<JsonRpcSigner>()
  const [initialized, setInitialized] = useState<boolean>(false)
  const [walletConnected, setWalletConnected] = useState<boolean>(false)
  const { PLUSHContract, provider } = usePLUSHContract()

  /**
   * Returns MetaMask wallet installation state
   * @returns Is MetaMask wallet installed or not
   **/
  const isInstalled = (): boolean => {
    return MetaMaskOnboarding.isMetaMaskInstalled()
  }

  /**
   * Returns Metamask wallet connection state
   * @returns Is MetaMask wallet connected or not to the website
   */

  const isConnected = async (): Promise<boolean> => {
    try {
      await getAddress()
      return true
    } catch {
      return false
    }
  }

  /**
   * Opens metamask installation page and returns user to the initial page
   * when he completes all installation steps
   **/
  const install = (): void => {
    onboarding.current?.startOnboarding()
  }

  /**
   * Opens metamask connection modal window
   */
  const connect = async () => {
    if (!isInstalled()) {
      throw errors.walletNotInstalled
    }

    await provider?.send('eth_requestAccounts', [])
  }

  /**
   * Returns active wallet account address
   * @returns wallet address
   **/
  const getAddress = async (): Promise<string> => {
    if (!signer) {
      throw errors.walletNotConnected
    }

    return await signer.getAddress()
  }

  /**
   * Returns PLAI balance of active wallet
   * @returns PLAI balance
   */
  const getPLAIBalance = async (): Promise<number> => {
    if (!signer) {
      throw errors.walletNotConnected
    }

    const balance = ethers.utils.formatUnits(await PLUSHContract.balanceOf(await getAddress()), 18)
    return parseInt(balance)
  }

  const getCurrency = async (): Promise<string> => {
    return await PLUSHContract.symbol()
  }

  /**
   * Opens MetaMask sign modal
   * @param signature Signature message user will see in Metamask popup (text + nonce)
   * @returns signed message
   */
  const sign = async (signature: string): Promise<string> => {
    if (!signer) {
      throw errors.walletNotConnected
    }

    try {
      const hash = await signer.signMessage(signature)
      return hash
    } catch (error) {
      throw errors.signingFailed
    }
  }

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  useEffect(() => {
    if (provider) {
      setSigner(provider.getSigner())
      setInitialized(true);
      (async function () {
        const accounts = await provider.listAccounts();
        setWalletConnected(accounts.length > 0);
      })()
    }
  }, [provider])

  const addMetamaskNetwork = async (NETWORK_ID: string) => {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: ethers.utils.hexValue(ethers.utils.hexlify(Number(NETWORK_ID))),
          rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
          chainName: 'Mumbai TestNet',
          nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
          blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        },
      ],
    });
  }

  const switchMetamaskNetwork = async (NETWORK_ID: string) => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [ethers.utils.hexValue(ethers.utils.hexlify(Number(NETWORK_ID)))]
    })
  }

  return {
    initialized,
    isInstalled,
    isConnected,
    install,
    connect,
    sign,
    getAddress,
    getPLAIBalance,
    getCurrency,
    addMetamaskNetwork,
    switchMetamaskNetwork,
    provider,
    signer,
    walletConnected
  }
}

export default useMetamaskWallet