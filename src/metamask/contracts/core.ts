import { Web3Provider } from '@ethersproject/providers'
import {
  LifeSpan as LifeSpanContract,
  LifeSpan__factory as LifeSpanFactory
} from '@plushfamily/plush-protocol-contracts'

const address = window.config.PLUSH_LIFESPAN ?? import.meta.env.VITE_PLUSH_LIFESPAN

class CoreContractManager {
  contract: LifeSpanContract

  constructor (provider: Web3Provider) {
    this.contract = LifeSpanFactory.connect(address, provider)
  }

  getTokenOwner = async (tokenId: number): Promise<string> => {
    return await this.contract.ownerOf(tokenId).then((ownerOfResult: string) => ownerOfResult)
  }

  balanceOf = async (address: string): Promise<any> => {
    return await this.contract.balanceOf(address).then((balanceOfResult) => Number(balanceOfResult._hex))
  }
}

export default CoreContractManager
