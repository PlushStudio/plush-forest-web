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
    treesInfo: [
      await walletStore.treeContractManager.getTreeInfo(shihuahuacoTreeNameBytes32),
      await walletStore.treeContractManager.getTreeInfo(cacaoTreeNameBytes32),
      await walletStore.treeContractManager.getTreeInfo(guabaTreeNameBytes32),
      await walletStore.treeContractManager.getTreeInfo(caobaTreeNameBytes32)
    ]
  }
})

export const $forest = forestDomain
  .createStore<ApiTreesMy>({
    treesInfo: []
  }).reset(logoutEvent)

$forest.on(getForestDataFx.doneData, (_, forest: ApiTreesMy) => {
  return forest
})
