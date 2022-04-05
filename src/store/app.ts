import { createDomain, createEvent } from 'effector';
import { logoutEvent } from './auth';
import { ApiApp } from "@/services/app";

export const appDomain = createDomain('app');

export const setActiveTreeEvt = createEvent<string>()
export const setWalletNetworkEvt = createEvent<string>()
export const setIsOpenMenuDropdownEvt = createEvent<boolean>()
export const setUserBalanceEvt = createEvent<number>()
export const setSafeBalanceEvt = createEvent<number>()
export const setCurrencyEvt = createEvent<string>()
export const setActiveAccordionTabIdEvt = createEvent<number>()

export const $app = appDomain
  .createStore<ApiApp>({
    selectedTreeType: 'SHIHUAHUACO',
    isOpenMenuDropdown: false,
    currentNetwork: '',
    userBalance: 0,
    safeBalance: 0,
    currency: '',
    activeAccordionTabId: -1
  })
  .on(setActiveTreeEvt, (state, activeTree) => ({
    ...state,
    selectedTreeType: activeTree
  }))
  .on(setWalletNetworkEvt, (state, currentNetwork) => ({
    ...state,
    currentNetwork
  }))
  .on(setIsOpenMenuDropdownEvt, (state, value) => ({
    ...state,
    isOpenMenuDropdown: value
  }))
  .on(setUserBalanceEvt, (state, value) => ({
    ...state,
    userBalance: value
  }))
  .on(setSafeBalanceEvt, (state, value) => ({
    ...state,
    safeBalance: value
  }))
  .on(setCurrencyEvt, (state, currency) => ({
    ...state,
    currency
  }))
  .on(setActiveAccordionTabIdEvt, (state, id) => ({
    ...state,
    activeAccordionTabId: id
  }))
  .reset(logoutEvent);
