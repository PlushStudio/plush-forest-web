import { ethers } from 'ethers'
import useMetamaskWallet from '@/hooks/useMetamaskWallet'
import axios from 'axios'
import api from '@/api/api'

const useTreeContract = () => {
  const getTreeContractAddress = window.config.TREE_CONTRACT_ADDRESS ?? import.meta.env.VITE_TREE_CONTRACT_ADDRESS
  const coinWalletsContractAddress = window.config.COIN_WALLETS_CONTRACT_ADDRESS ?? import.meta.env.VITE_COIN_WALLETS_CONTRACT_ADDRESS

  const treeContractAbi = [{"inputs":[{"internalType":"address","name":"_plushForestAddress","type":"address"},{"internalType":"address","name":"_plushAddress","type":"address"},{"internalType":"address","name":"_plushControllerAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"string","name":"_type","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"addTreeType","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"changeContractStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_type","type":"string"}],"name":"getTreeTypeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_type","type":"string"}],"name":"getTreeTypePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_mintAddress","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"string","name":"_type","type":"string"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_type","type":"string"}],"name":"removeTreeType","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_type","type":"string"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"setTreeTypeCount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_type","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setTreeTypePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const coinWalletsContractAbi = [{"inputs":[{"internalType":"address","name":"_plushAddress","type":"address"},{"internalType":"address","name":"_plushAppsAddress","type":"address"},{"internalType":"address","name":"_plushFeeAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"decreaseWalletAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getMinimumAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlushFeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlushFeeWalletAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"getWalletAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setMinimumAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setPlushFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"walletInfo","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_address","type":"address"}],"name":"withdrawByController","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const { signer } = useMetamaskWallet()

  let TreeContract = new ethers.Contract(
    getTreeContractAddress,
    treeContractAbi,
    // @ts-ignore
    signer
  )

  let PlushCoinWalletsContract = new ethers.Contract(
    coinWalletsContractAddress,
    coinWalletsContractAbi,
    // @ts-ignore
    signer
  )

  const mintTree = async (address: string, treeType: string, amount: string, from: string, name: string, message?: string) => {
    try {
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
    } catch (e: any) {
      throw Error(e.message)
    }
  }

  const getSafeBalance = async (address: string) => {
    try {
      const uint256balance = await PlushCoinWalletsContract.getWalletAmount(address)
      return Number(ethers.utils.formatEther(uint256balance));
    } catch (e: any) {
      console.error(e.message)
    }
  }

  const getTreeTypeCount = async (treeType: string) => {
    try {
      const treeCount = await TreeContract.getTreeTypeCount(treeType)
      return treeCount.toNumber();
    } catch (e: any) {
      throw Error(e.message)
    }
  }

  const getTreeTypePrice = async (treeType: string) => {
    try {
      const treePrice = await TreeContract.getTreeTypePrice(treeType)
      return Number(ethers.utils.formatEther(treePrice._hex));
    } catch (e: any) {
      throw Error(e.message)
    }
  }

  const deposit = async (value: string) => {
    try {
      const depositResult = await PlushCoinWalletsContract.deposit(value)
      await depositResult.wait()
    } catch (e: any) {
      throw Error(e.message)
    }
  }

  return {
    mintTree,
    getTreeTypeCount,
    getTreeTypePrice,
    getSafeBalance,
    deposit
  }

}
export default useTreeContract
