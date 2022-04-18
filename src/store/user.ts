import userService from '@/services/user'
import { ApiProfile } from '@/services/user/users'
import { createDomain, createEffect } from 'effector'
import { logoutEvent } from './auth'

export const userDomain = createDomain('user')

export const getUserFx = createEffect(async (): Promise<ApiProfile> => {
  return await userService.users.endpoints.getProfile()
})

export const $user = userDomain
  .createStore<ApiProfile>({
    id: '',
    address: '',
    email: '',
    name: '',
    role: 'USER',
    dateOfBirth: null,
    country: '',
    state: '',
    city: '',
    gender: 'FEMALE',
    isActive: false,
    childs: []
  }).reset(logoutEvent)

$user.on(getUserFx.doneData, (_, user: ApiProfile) => {
  return user
})
