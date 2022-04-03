import { createDomain, createEffect, createEvent } from "effector";
import { login, logout } from '@/metamask/wallet/authenticator'
import MetamaskWallet from '@/metamask/wallet/metamaskWallet';
import api from "@/api/api";

export const authDomain = createDomain('auth');

export const logoutEvent = createEvent()
export const loginEvent = createEvent()

export const $auth = authDomain.createStore<{
  isLoggedIn: boolean,
  isLoginStateRecieved: boolean
}>({
  isLoggedIn: false,
  isLoginStateRecieved: false
})

export const loginFx = createEffect(async (wallet: MetamaskWallet): Promise<void> => {
  await login(
    wallet,
    new URL(`${api.url}/${api.user.auth.nonce.url}`),
    new URL(`${api.url}/${api.user.auth.login.url}`)
  )
})

export const logoutFx = createEffect(async (): Promise<void> => {
  await logout(
    new URL(`${api.url}/${api.user.auth.logout.url}`)
  )
})

$auth.on(loginEvent, () => {
  return {
    isLoggedIn: true,
    isLoginStateRecieved: true
  }
})

$auth.on(logoutEvent, () => {
  return {
    isLoggedIn: false,
    isLoginStateRecieved: true
  }
})

$auth.on(loginFx.done, () => {
  loginEvent()
})

$auth.on(logoutFx.done, () => {
  logoutEvent()
})