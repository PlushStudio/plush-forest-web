import { createDomain, createEvent } from 'effector';
import { logoutEvent } from './auth';
import { ApiApp } from "@/services/app";

export const appDomain = createDomain('app');

export const setActiveTree = createEvent<string>()
export const setWalletNetwork = createEvent<string>()
export const setIsOpenMenuDropdown = createEvent<boolean>()
export const setUserBalance = createEvent<number>()
export const setSafeBalance = createEvent<number>()
export const setActiveAccordionTabId = createEvent<number>()

export const $app = appDomain
  .createStore<ApiApp>({
    selectedTreeType: 'SHIHUAHUACO',
    isOpenMenuDropdown: false,
    currentNetwork: '',
    userBalance: 0,
    safeBalance: 0,
    activeAccordionTabId: -1
  })
  .on(setActiveTree, (state, activeTree) => ({
    ...state,
    selectedTreeType: activeTree
  }))
  .on(setWalletNetwork, (state, currentNetwork) => ({
    ...state,
    currentNetwork
  }))
  .on(setIsOpenMenuDropdown, (state, value) => ({
    ...state,
    isOpenMenuDropdown: value
  }))
  .on(setUserBalance, (state, value) => ({
    ...state,
    userBalance: value
  }))
  .on(setSafeBalance, (state, value) => ({
    ...state,
    safeBalance: value
  }))
  .on(setActiveAccordionTabId, (state, id) => ({
    ...state,
    activeAccordionTabId: id
  }))
  .reset(logoutEvent);
