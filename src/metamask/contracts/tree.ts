import { JsonRpcSigner } from '@ethersproject/providers'
import { Contract, ethers } from 'ethers'
import axios from 'axios'
import api from '@/api/api'

const abi = [{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' }, { anonymous: false, inputs: [{ indexed: false, internalType: 'address', name: 'previousAdmin', type: 'address' }, { indexed: false, internalType: 'address', name: 'newAdmin', type: 'address' }], name: 'AdminChanged', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'beacon', type: 'address' }], name: 'BeaconUpgraded', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }], name: 'Paused', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' }, { indexed: true, internalType: 'bytes32', name: 'previousAdminRole', type: 'bytes32' }, { indexed: true, internalType: 'bytes32', name: 'newAdminRole', type: 'bytes32' }], name: 'RoleAdminChanged', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' }, { indexed: true, internalType: 'address', name: 'account', type: 'address' }, { indexed: true, internalType: 'address', name: 'sender', type: 'address' }], name: 'RoleGranted', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' }, { indexed: true, internalType: 'address', name: 'account', type: 'address' }, { indexed: true, internalType: 'address', name: 'sender', type: 'address' }], name: 'RoleRevoked', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }], name: 'Unpaused', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'implementation', type: 'address' }], name: 'Upgraded', type: 'event' }, { inputs: [], name: 'DEFAULT_ADMIN_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'OPERATOR_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'PAUSER_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'UPGRADER_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'string', name: '_type', type: 'string' }, { internalType: 'uint256', name: '_price', type: 'uint256' }, { internalType: 'uint256', name: '_count', type: 'uint256' }], name: 'addTreeType', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }], name: 'getRoleAdmin', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'string', name: '_type', type: 'string' }], name: 'getTreeTypeCount', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'string', name: '_type', type: 'string' }], name: 'getTreeTypePrice', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }, { internalType: 'address', name: 'account', type: 'address' }], name: 'grantRole', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }, { internalType: 'address', name: 'account', type: 'address' }], name: 'hasRole', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: '_plushForestAddress', type: 'address' }, { internalType: 'address', name: '_plushAddress', type: 'address' }, { internalType: 'address', name: '_plushControllerAddress', type: 'address' }], name: 'initialize', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: '_mintAddress', type: 'address' }, { internalType: 'uint256', name: '_amount', type: 'uint256' }, { internalType: 'string', name: '_type', type: 'string' }], name: 'mint', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'pause', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'paused', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'proxiableUUID', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'string', name: '_type', type: 'string' }], name: 'removeTreeType', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }, { internalType: 'address', name: 'account', type: 'address' }], name: 'renounceRole', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }, { internalType: 'address', name: 'account', type: 'address' }], name: 'revokeRole', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'string', name: '_type', type: 'string' }, { internalType: 'uint256', name: '_count', type: 'uint256' }], name: 'setTreeTypeCount', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'string', name: '_type', type: 'string' }, { internalType: 'uint256', name: '_price', type: 'uint256' }], name: 'setTreeTypePrice', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }], name: 'supportsInterface', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'newImplementation', type: 'address' }], name: 'upgradeTo', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'newImplementation', type: 'address' }, { internalType: 'bytes', name: 'data', type: 'bytes' }], name: 'upgradeToAndCall', outputs: [], stateMutability: 'payable', type: 'function' }]
const address = window.config.TREE_CONTRACT_ADDRESS ?? import.meta.env.VITE_TREE_CONTRACT_ADDRESS

class TreeContractManager {
  contract: Contract

  constructor (signer: JsonRpcSigner) {
    this.contract = new ethers.Contract(address, abi, signer)
  }

  mintTree = async (address: string, treeType: string, amount: string, from: string, name: string, message = 'empty message') => {
    try {
      return await this.contract.mint(address, amount, treeType, { gasLimit: 500000 }).then((transferResult: any) => {
        return axios.post(`${api.url}/forest/transactions/new`,
          {
            hash: transferResult.hash, tree: treeType, name: name, from, message
          }, { withCredentials: true }).then(response => {
          return response.status === 201
        }).catch(r => {
          console.error(r.message)
          return false
        })
      })
    } catch (e: any) {
      throw Error(e.message)
    }
  }

  getTreeTypeCount = async (treeType: string) => {
    try {
      const treeCount = await this.contract.getTreeTypeCount(treeType)
      return treeCount.toNumber()
    } catch (e: any) {
      throw Error(e.message)
    }
  }

  getTreeTypePrice = async (treeType: string) => {
    try {
      const treePrice = await this.contract.getTreeTypePrice(treeType)
      return Number(ethers.utils.formatEther(treePrice._hex))
    } catch (e: any) {
      throw Error(e.message)
    }
  }
}

export default TreeContractManager
