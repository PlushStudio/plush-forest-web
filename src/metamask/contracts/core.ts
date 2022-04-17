import { Web3Provider } from '@ethersproject/providers'
import { PlushCoreToken, PlushCoreToken__factory as PlushCoreTokenFactory } from '@plushfamily/plush-protocol-contracts'

const address = window.config.CORE_CONTRACT_ADDRESS ?? import.meta.env.VITE_CORE_CONTRACT_ADDRESS

class CoreContractManager {
  contract: PlushCoreToken

  constructor (provider: Web3Provider) {
    this.contract = PlushCoreTokenFactory.connect(address, provider)
  }

  getTokenOwner = async (tokenId: number): Promise<string> => {
    return await this.contract.ownerOf(tokenId).then((ownerOfResult: string) => ownerOfResult)
  }

  balanceOf = async (address: string): Promise<any> => {
    return await this.contract.balanceOf(address).then((balanceOfResult) => balanceOfResult)
  }
}

export default CoreContractManager
