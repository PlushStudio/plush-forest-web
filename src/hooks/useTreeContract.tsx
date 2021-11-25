import { ethers } from 'ethers'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'
import axios from 'axios'
import api from '@/api/api'

const useTreeContract = () => {
  const getTreeContractAddress = window.config.CORE_GET_TREE_CONTRACT_ADDRESS ?? "0x13fA2684F68DBc2C8D91AD2b1A9717C6530c7016"
  const genericErc20Abi = [{
    'inputs': [{
      'internalType': 'address',
      'name': '_plushForestAddress',
      'type': 'address'
    }, { 'internalType': 'address', 'name': '_plaiAddress', 'type': 'address' }, {
      'internalType': 'address',
      'name': '_safeAddress',
      'type': 'address'
    }], 'stateMutability': 'nonpayable', 'type': 'constructor'
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'address',
      'name': 'previousOwner',
      'type': 'address'
    }, { 'indexed': true, 'internalType': 'address', 'name': 'newOwner', 'type': 'address' }],
    'name': 'OwnershipTransferred',
    'type': 'event'
  }, {
    'inputs': [{ 'internalType': 'string', 'name': '_type', 'type': 'string' }, {
      'internalType': 'uint256',
      'name': '_price',
      'type': 'uint256'
    }, { 'internalType': 'uint256', 'name': '_count', 'type': 'uint256' }],
    'name': 'addTreeType',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'inputs': [],
    'name': 'changeContractStatus',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'inputs': [],
    'name': 'getSafeAddress',
    'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'string', 'name': '_type', 'type': 'string' }],
    'name': 'getTreeTypeCount',
    'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'string', 'name': '_type', 'type': 'string' }],
    'name': 'getTreeTypePrice',
    'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [],
    'name': 'getTreeTypes',
    'outputs': [{ 'internalType': 'string[]', 'name': '', 'type': 'string[]' }],
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [],
    'name': 'isActive',
    'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'address', 'name': '_mintAddress', 'type': 'address' }, {
      'internalType': 'uint256',
      'name': '_amount',
      'type': 'uint256'
    }, { 'internalType': 'string', 'name': '_type', 'type': 'string' }],
    'name': 'mint',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'inputs': [],
    'name': 'owner',
    'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'string', 'name': '_type', 'type': 'string' }],
    'name': 'removeTreeType',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'address', 'name': '_address', 'type': 'address' }],
    'name': 'setSafeAddress',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'string', 'name': '_type', 'type': 'string' }, {
      'internalType': 'uint256',
      'name': '_count',
      'type': 'uint256'
    }], 'name': 'setTreeTypeCount', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'string', 'name': '_type', 'type': 'string' }, {
      'internalType': 'uint256',
      'name': '_price',
      'type': 'uint256'
    }], 'name': 'setTreeTypePrice', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
  }, {
    'inputs': [{ 'internalType': 'address', 'name': 'newOwner', 'type': 'address' }],
    'name': 'transferOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }]
  const { signer } = useMetamaskWallet()

  const mintATree = async (address: string, treeType: string, from: string, name: string, message?: string) => {
    try {
      const amount: string = '5000000000000000000'
      let TreeContract = new ethers.Contract(
        getTreeContractAddress,
        genericErc20Abi,
        // @ts-ignore
        signer
      )

      return await TreeContract.mint(address, amount, treeType, { gasLimit: 500000 }).then((transferResult: any) => {
        return axios.post(`${api.url}/forest/transactions/new`,
          {
            hash: transferResult.hash, tree: treeType, name: name, from, message: 'Test message'
          }, { withCredentials: true }).then(response => {
          return response.status === 201
        }).catch(r => {
          console.error(r.message)
          return false
        })
      })
    } catch (e) {
      console.error(e.message)
    }
  }


  return {
    mintATree
  }

}
export default useTreeContract