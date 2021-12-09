import { JsonRpcSigner } from '@ethersproject/providers'
import MetaMaskOnboarding from '@metamask/onboarding'
import { ethers } from 'ethers'
import { useEffect, useRef, useState} from 'react'
import usePLAIContract from '@/hooks/usePLAIContract'

export const errors = {
  walletNotInstalled: {
    code: 1,
    message: 'Wallet is not installed'
  },
  walletNotConnected: {
    code: 2,
    message: 'Wallet is not connected'
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
  const { PLAIContractAddress, PLAIContract, genericErc20Abi, provider } = usePLAIContract()

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
   * @returns Wallet address
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

    const balance = ethers.utils.formatUnits(await PLAIContract.balanceOf(await getAddress()), 18)
    return parseInt(balance)
  }

  const getTicker = async (): Promise<string> => {
    return await PLAIContract.symbol()
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
      (async function() {
       const accounts = await provider.listAccounts();
       setWalletConnected(accounts.length > 0);
      })()
    }
  }, [provider])

  function sendPLAI(send_token_amount: string, to_address: string, send_account: string) {
    provider?.getGasPrice().then((currentGasPrice: any) => {
      let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice.toString()))
      if (PLAIContractAddress) {
        // general token send
        let PLAIcontract = new ethers.Contract(
          PLAIContractAddress,
          genericErc20Abi,
          // @ts-ignore
          signer
        )

        // How many tokens?
        let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 8)

        // Send tokens
        PLAIcontract.transfer(to_address, numberOfTokens).then((transferResult: string) => {
          console.dir(transferResult)
          alert('sent token')
        })
      } // ether send
      else {
        const tx = {
          from: send_account,
          to: to_address,
          value: ethers.utils.parseEther(send_token_amount),
          nonce: provider.getTransactionCount(
            send_account,
            'latest'
          ),
          gasLimit: ethers.utils.hexlify('0x100000'), // 100000
          gasPrice: gas_price
        }
        console.dir(tx)
        try {
          signer?.sendTransaction(tx).then((transaction) => {
            console.dir(transaction)
            alert('Send finished!')
          })
        } catch (error) {
          alert('failed to send!!')
        }
      }
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
    getTicker,
    provider,
    signer,
    walletConnected,
    sendPLAI
  }
}

export default useMetamaskWallet