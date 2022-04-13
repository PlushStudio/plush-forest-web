import MetamaskWallet from './metamaskWallet'

/**
   * Returns nonce from backend
   * @param nonceUrl URL to get nonce
   * @param address Wallet address
   * @returns Nonce number
   */
const getNonce = async (nonceUrl: URL, address: string): Promise<number | undefined> => {
  const url = `${nonceUrl.href}/${address}`
  const response = await fetch(url, {
    method: 'GET'
  })
  const data = await response.json()

  if (!response.ok) {
    throw data
  }

  return data.nonce
}

/**
 * Sends login data to the server
 * @param authUrl URL to login
 * @param publicAddress Public wallet address
 * @param signature personal signature
 * @returns Operation status
 */
const sendLoginData = async (authUrl: URL, publicAddress: string, signature: string): Promise<any> => {
  const response = await fetch(authUrl.href, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
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
}

/**
 * Performs login through the MetaMask wallet
 */
const login = async (wallet: MetamaskWallet, nonceUrl: URL, authUrl: URL): Promise<void> => {
  const isWalletConnected = await wallet.isConnected()

  if (!isWalletConnected) {
    await wallet.connect()
  }

  const address = await wallet.getAddress()
  const nonce = await getNonce(nonceUrl, address)

  if (!nonce) {
    return
  }

  const hash = await wallet.signMessage(`Please sign this message to connect to Plush. Nonce: ${nonce}`)
  await sendLoginData(authUrl, address, hash)
}

const logout = async (logoutUrl: URL): Promise<any> => {
  const response = await fetch(logoutUrl.href, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  const data = await response.json()

  if (!response.ok) {
    throw data
  }

  return data
}

export {
  login,
  logout
}
