import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BigNumber, ethers } from 'ethers'
import { PlushCoinWallets, PlushCoinWallets__factory as PlushCoinWalletsFactory } from '@plushfamily/plush-protocol-contracts'
export const plushCoinWalletsAddress = window.config.COIN_WALLETS_CONTRACT_ADDRESS ?? import.meta.env.VITE_COIN_WALLETS_CONTRACT_ADDRESS

class PlushCoinWalletsContractManager {
  contract: PlushCoinWallets
  readonly signer: JsonRpcSigner;

  constructor (provider: Web3Provider) {
    this.signer = provider.getSigner()
    this.contract = PlushCoinWalletsFactory.connect(plushCoinWalletsAddress, this.signer)
  }

  getBalance = async (address: string): Promise<number> => {
    const balanceArr: [BigNumber] = await this.contract.functions.getWalletAmount(address)
    return parseInt(ethers.utils.formatUnits(balanceArr[0], 18))
  }

  deposit = async (address: string, value: string) => {
    const depositResult = await this.contract.functions.deposit(address, value)
    await depositResult.wait()
  }
}

export default PlushCoinWalletsContractManager
