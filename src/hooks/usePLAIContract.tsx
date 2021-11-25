import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import { ExternalProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

const getTreeContractAddress = window.config.CORE_GET_TREE_CONTRACT_ADDRESS ?? "0x13fA2684F68DBc2C8D91AD2b1A9717C6530c7016"
const PLAIContractAddress = window.config.PLAI_CONTRACT_ADDRESS ?? "0x8663f80619Cbc4562FF8e0986917429E917C79ba"

const usePLAIContract = () => {
  const [provider, setProvider] = useState<Web3Provider>()
  const [signer, setSigner] = useState<JsonRpcSigner>()
  const genericErc20Abi = [{
    'inputs': [],
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  }, {
    'anonymous': false,
    'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'owner', 'type': 'address' }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'spender',
      'type': 'address'
    }, { 'indexed': false, 'internalType': 'uint256', 'name': 'value', 'type': 'uint256' }],
    'name': 'Approval',
    'type': 'event'
  }, {
    'anonymous': false,
    'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'from', 'type': 'address' }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'to',
      'type': 'address'
    }, { 'indexed': false, 'internalType': 'uint256', 'name': 'value', 'type': 'uint256' }],
    'name': 'Transfer',
    'type': 'event'
  }, {
    'inputs': [{ 'internalType': 'address', 'name': 'owner', 'type': 'address' }, {
      'internalType': 'address',
      'name': 'spender',
      'type': 'address'
    }],
    'name': 'allowance',
    'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'address', 'name': 'spender', 'type': 'address' }, {
      'internalType': 'uint256',
      'name': 'amount',
      'type': 'uint256'
    }],
    'name': 'approve',
    'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'address', 'name': 'account', 'type': 'address' }],
    'name': 'balanceOf',
    'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [],
    'name': 'decimals',
    'outputs': [{ 'internalType': 'uint8', 'name': '', 'type': 'uint8' }],
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'address', 'name': 'spender', 'type': 'address' }, {
      'internalType': 'uint256',
      'name': 'subtractedValue',
      'type': 'uint256'
    }],
    'name': 'decreaseAllowance',
    'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'address', 'name': 'spender', 'type': 'address' }, {
      'internalType': 'uint256',
      'name': 'addedValue',
      'type': 'uint256'
    }],
    'name': 'increaseAllowance',
    'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'inputs': [],
    'name': 'name',
    'outputs': [{ 'internalType': 'string', 'name': '', 'type': 'string' }],
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [],
    'name': 'symbol',
    'outputs': [{ 'internalType': 'string', 'name': '', 'type': 'string' }],
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'address', 'name': 'recipient', 'type': 'address' }, {
      'internalType': 'uint256',
      'name': 'amount',
      'type': 'uint256'
    }],
    'name': 'transfer',
    'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'address', 'name': 'sender', 'type': 'address' }, {
      'internalType': 'address',
      'name': 'recipient',
      'type': 'address'
    }, { 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256' }],
    'name': 'transferFrom',
    'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }]

  // @ts-ignore
  const PLAIContract = new ethers.Contract(PLAIContractAddress, genericErc20Abi, provider)

  useEffect(() => {
    if (provider) {
      setSigner(provider.getSigner())
    }
  }, [provider])

  useEffect(() => {
    /**
     * Waits when window.ethereum will be available and
     * sets provider and signer to work with blockchain
     */
    const detectProvider = async (): Promise<void> => {
      const ethereumMetamaskGlobalObject = await detectEthereumProvider({
        mustBeMetaMask: true,
        silent: true
      }) as ExternalProvider

      if (!ethereumMetamaskGlobalObject) {
        // Metamask wallet is not installed, but it is ok
        // in this case, do nothing
        return
      }

      // @ts-ignore
      setProvider(new ethers.providers.Web3Provider(ethereumMetamaskGlobalObject))
    }
    detectProvider()
  }, [])

  const getBuyAllowance = async (address: string) => {
    const allowanceResult = await PLAIContract.allowance(address, getTreeContractAddress)
    return parseInt(allowanceResult._hex, 16) === 5000000000000000000
  }

  const getApprove = async () => {
    let PLAIContract = new ethers.Contract(
      PLAIContractAddress,
      genericErc20Abi,
      // @ts-ignore
      signer
    )
    await PLAIContract.approve(getTreeContractAddress, '5000000000000000000')
  }

  return {
    PLAIContract,
    PLAIContractAddress,
    genericErc20Abi,
    provider,
    getTreeContractAddress,
    getBuyAllowance,
    getApprove
  }
}
export default usePLAIContract