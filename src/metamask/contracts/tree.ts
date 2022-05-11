import { JsonRpcSigner } from '@ethersproject/providers'
import { ethers } from 'ethers'
import axios from 'axios'
import api from '@/api/api'
import {
  PlushGetTree as PlushGetTreeContract,
  PlushGetTree__factory as PlushGetTreeFactory
} from '@plushstudio/plush-studio-contracts'
import { stringToBytes32 } from '@/utils/utils'

const address = window.config.TREE_CONTRACT_ADDRESS ?? import.meta.env.VITE_TREE_CONTRACT_ADDRESS

class TreeContractManager {
  contract: PlushGetTreeContract

  constructor (signer: JsonRpcSigner) {
    this.contract = PlushGetTreeFactory.connect(address, signer)
  }

  mintTree = async (address: string, type: string, from: string, name: string, message = 'empty message') => {
    const treeTypeBytes32 = stringToBytes32(type)
    return await this.contract.mint(treeTypeBytes32, address, { gasLimit: 500000 }).then((transferResult: any) => {
      return axios.post(`${api.url}/forest/transactions/new`,
        {
          hash: transferResult.hash, tree: type, name: name, from, message
        }, { withCredentials: true }).then(response => {
        return response.status === 201
      }).catch(r => {
        console.error(r.message)
        return false
      })
    })
  }

  getTreeTypeCount = async (type: string) => {
    const treeCount = await this.contract.getTreeTypeCount(type)
    return treeCount.toNumber()
  }

  getTreeTypePrice = async (type: string) => {
    const treePrice = await this.contract.getTreeTypePrice(type)
    return Number(ethers.utils.formatEther(treePrice._hex))
  }

  getTreeInfo = async (type: string) => {
    const treeInfo = await this.contract.trees(type)
    return {
      type: treeInfo.treeType,
      price: Number(ethers.utils.formatEther(treeInfo.price)),
      count: Number(treeInfo.count)
    }
  }
}

export default TreeContractManager
