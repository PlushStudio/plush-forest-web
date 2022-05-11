import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BigNumber, ethers } from 'ethers'
import {
  PlushAccounts as PlushAccountsContract,
  PlushAccounts__factory as PlushAccountsFactory
} from '@plushfamily/plush-protocol-contracts'

export const plushAccountsAddress = window.config.PLUSH_ACCOUNTS ?? import.meta.env.VITE_PLUSH_ACCOUNTS

class PlushCoinWalletsContractManager {
  contract: PlushAccountsContract
  readonly signer: JsonRpcSigner;

  constructor (provider: Web3Provider) {
    this.signer = provider.getSigner()
    this.contract = PlushAccountsFactory.connect(plushAccountsAddress, this.signer)
  }

  getBalance = async (address: string): Promise<number> => {
    const balanceArr: [BigNumber] = await this.contract.functions.getAccountBalance(address)
    return parseInt(ethers.utils.formatUnits(balanceArr[0], 18))
  }

  deposit = async (address: string, value: string) => {
    const depositResult = await this.contract.functions.deposit(address, value)
    await depositResult.wait()
  }
}

export default PlushCoinWalletsContractManager
