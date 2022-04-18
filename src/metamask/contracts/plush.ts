import { ethers } from 'ethers'
import { plushCoinWalletsAddress } from '@/metamask/contracts/plushCoinWallets'
import { JsonRpcSigner } from '@ethersproject/providers'
import { Plush as PlushContract, Plush__factory as PlushFactory } from '@plushfamily/plush-protocol-contracts'

const address = window.config.PLUSH_CONTRACT_ADDRESS ?? import.meta.env.VITE_PLUSH_CONTRACT_ADDRESS

class PlushContractManager {
  contract: PlushContract

  constructor (signer: JsonRpcSigner) {
    this.contract = PlushFactory.connect(address, signer)
  }

  getBalance = async (address: string): Promise<number> => {
    const balanceStr = await this.contract.balanceOf(address)
    const balance = parseInt(ethers.utils.formatUnits(balanceStr, 18))
    return balance
  }

  getApprove = async (treePrice: string) => {
    return await this.contract.approve(plushCoinWalletsAddress, treePrice)
  }

  getBuyAllowance = async (address: string, treePrice: string): Promise<boolean | undefined> => {
    try {
      const allowanceResult = await this.contract.allowance(address, plushCoinWalletsAddress)
      return Number(ethers.utils.formatEther(allowanceResult)) >= Number(ethers.utils.formatEther(treePrice))
    } catch (e) {
      console.log(e.message)
    }
  }

  getCurrency = async (): Promise<string> => {
    return await this.contract.symbol()
  }
}

export default PlushContractManager
