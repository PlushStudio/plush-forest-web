import { createDomain, createEffect } from 'effector';
import MetamaskWallet from '@/metamask/wallet/metamaskWallet';
import PlushContractManager from '@/metamask/contracts/plush';
import PlushCoinWalletsContractManager from '@/metamask/contracts/plushCoinWallets';
import TreeContractManager from "@/metamask/contracts/tree";
import CoreContractManager from "@/metamask/contracts/core";

export interface WalletStore {
  wallet: MetamaskWallet,
  plushContractManager: PlushContractManager,
  plushCoinWalletsContractManager: PlushCoinWalletsContractManager,
  treeContractManager: TreeContractManager,
  coreContractManager: CoreContractManager
}

export const walletDomain = createDomain('wallet');

export const getMetamaskWalletFx = createEffect(async (): Promise<WalletStore> => {
  const provider = await MetamaskWallet.detectProvider()
  const wallet = new MetamaskWallet(provider)
  const plushContractManager = new PlushContractManager(provider)
  const plushCoinWalletsContractManager = new PlushCoinWalletsContractManager(provider)
  const treeContractManager = new TreeContractManager(provider)
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
