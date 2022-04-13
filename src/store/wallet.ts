import { createDomain, createEffect } from 'effector'
import MetamaskWallet from '@/metamask/wallet/metamaskWallet'
import PlushContractManager from '@/metamask/contracts/plush'
import PlushCoinWalletsContractManager from '@/metamask/contracts/plushCoinWallets'
import TreeContractManager from '@/metamask/contracts/tree'
import CoreContractManager from '@/metamask/contracts/core'

export interface WalletStore {
  wallet: MetamaskWallet,
  plushContractManager: PlushContractManager,
  plushCoinWalletsContractManager: PlushCoinWalletsContractManager,
  treeContractManager: TreeContractManager,
  coreContractManager: CoreContractManager
}

export const walletDomain = createDomain('wallet')

export const getMetamaskWalletFx = createEffect(async (): Promise<WalletStore> => {
  const provider = await MetamaskWallet.detectProvider()
  const signer = await provider.getSigner()
  const wallet = new MetamaskWallet(provider)
  const plushContractManager = new PlushContractManager(signer)
  const plushCoinWalletsContractManager = new PlushCoinWalletsContractManager(provider)
  const treeContractManager = new TreeContractManager(signer)
  const coreContractManager = new CoreContractManager(provider)

  return {
    wallet,
    plushContractManager,
    plushCoinWalletsContractManager,
    treeContractManager,
    coreContractManager
  }
})

export const $walletStore = walletDomain
  .createStore<WalletStore | null>(null)

$walletStore.on(getMetamaskWalletFx.doneData, (_, wallet: WalletStore) => wallet)
