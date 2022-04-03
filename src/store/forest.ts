import { createDomain, createEffect, createEvent } from 'effector';
import { logoutEvent } from './auth';
import { WalletStore } from "@/store/wallet";
import { ApiTreesMy } from "@/services/forest/trees";

export const forestDomain = createDomain('forest');

export const setActiveTreeEvent = createEvent<string>()

export const getForestDataFx = createEffect(async (walletStore: WalletStore): Promise<ApiTreesMy> => {
  return {
    selectedTreeType: 'SHIHUAHUACO',
    treesPrice: [
      await walletStore.treeContractManager.getTreeTypePrice('SHIHUAHUACO'),
      await walletStore.treeContractManager.getTreeTypePrice('CACAO'),
      await walletStore.treeContractManager.getTreeTypePrice('GUABA'),
      await walletStore.treeContractManager.getTreeTypePrice('CAOBA')
    ],
    treesCount: [
      await walletStore.treeContractManager.getTreeTypeCount('SHIHUAHUACO'),
      await walletStore.treeContractManager.getTreeTypeCount('CACAO'),
      await walletStore.treeContractManager.getTreeTypeCount('GUABA'),
      await walletStore.treeContractManager.getTreeTypeCount('CAOBA')
    ]
  }
})

export const $forest = forestDomain
  .createStore<ApiTreesMy>({
    selectedTreeType: 'SHIHUAHUACO',
    treesCount: [],
    treesPrice: [],
  }).on(setActiveTreeEvent, (state, activeTree) => ({
    ...state,
    selectedTreeType: activeTree
  })).reset(logoutEvent);

$forest.on(getForestDataFx.doneData, (_, forest: ApiTreesMy) => {
  return forest
})
