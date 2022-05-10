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

  mintTree = async (address: string, treeType: string, from: string, name: string, message = 'empty message') => {
    try {
      const treeTypeBytes32 = stringToBytes32(treeType)
      return await this.contract.mint(treeTypeBytes32, address, { gasLimit: 500000 }).then((transferResult: any) => {
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

  getTreeInfo = async (treeType: string) => {
    try {
      const treeInfo = await this.contract.trees(treeType)
      return {
        treeType: treeInfo.treeType,
        price: Number(ethers.utils.formatEther(treeInfo.price)),
        count: Number(treeInfo.count)
      }
    } catch (e: any) {
      throw Error(e.message)
    }
  }
}

export default TreeContractManager
