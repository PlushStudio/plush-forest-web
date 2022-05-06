import { createDomain, createEffect } from 'effector'
import { logoutEvent } from './auth'
import { WalletStore } from '@/store/wallet'
import { ApiTreesMy } from '@/services/forest/trees'
import {
  cacaoTreeNameBytes32,
  caobaTreeNameBytes32,
  guabaTreeNameBytes32,
  shihuahuacoTreeNameBytes32
} from '@/constants'

export const forestDomain = createDomain('forest')

export const getForestDataFx = createEffect(async (walletStore: WalletStore): Promise<ApiTreesMy> => {
  return {
    treesPrice: [
      await walletStore.treeContractManager.getTreeTypePrice(shihuahuacoTreeNameBytes32),
      await walletStore.treeContractManager.getTreeTypePrice(cacaoTreeNameBytes32),
      await walletStore.treeContractManager.getTreeTypePrice(guabaTreeNameBytes32),
      await walletStore.treeContractManager.getTreeTypePrice(caobaTreeNameBytes32)
    ],
    treesCount: [
      await walletStore.treeContractManager.getTreeTypeCount(shihuahuacoTreeNameBytes32),
      await walletStore.treeContractManager.getTreeTypeCount(cacaoTreeNameBytes32),
      await walletStore.treeContractManager.getTreeTypeCount(guabaTreeNameBytes32),
      await walletStore.treeContractManager.getTreeTypeCount(caobaTreeNameBytes32)
    ]
  }
})

export const $forest = forestDomain
  .createStore<ApiTreesMy>({
    treesCount: [],
    treesPrice: []
  }).reset(logoutEvent)

$forest.on(getForestDataFx.doneData, (_, forest: ApiTreesMy) => {
  return forest
})
