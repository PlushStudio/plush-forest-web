import { useCallback } from "react"
import useMetamaskWallet, { errors } from "./useMetamaskWallet"

const useMetamaskAuth = () => {
  const wallet = useMetamaskWallet()

  /**
   * Returns nonce from backend
   * @param nonceUrl URL to get nonce
   * @param address Wallet address
   * @returns Nonce number
   */
  const getNonce = useCallback(async (nonceUrl: URL, address: string): Promise<number | undefined> => {
    const url = `${nonceUrl.href}/${address}`
    const response = await fetch(url, {
      method: 'GET'
    })
    const data = await response.json()

    if (!response.ok) {
      throw data
    }

    return data.nonce
  }, [])

  /**
   * Sends login data to the server
   * @param authUrl URL to login
   * @param publicAddress Public wallet address
   * @param signature personal signature
   * @returns Operation status
   */
  const sendLoginData = useCallback(async (authUrl: URL, publicAddress: string, signature: string): Promise<any> => {
    const response = await fetch(authUrl.href, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        publicAddress,
        signature
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw data
    }

    return data
  }, [])

  /**
   * Performs login through the MetaMask wallet
   */
  const login = async (nonceUrl: URL, authUrl: URL): Promise<void> => {
    if (!wallet.isInstalled()) {
      wallet.install()
    }

    const isWalletConnected = await wallet.isConnected()

    if (!isWalletConnected) {
      await wallet.connect()
    }

    const address = await wallet.getAddress()
    const nonce = await getNonce(nonceUrl, address)

    if (!nonce) {
      return
    }

    const hash = await wallet.sign(`Please sign this message to connect to Plush. Nonce: ${nonce}`)
    await sendLoginData(authUrl, address, hash)
  }

  return {
    login,
  }
}

export default useMetamaskAuth