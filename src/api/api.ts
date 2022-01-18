import backend from './axios'
import { AxiosResponse } from 'axios'
import { User } from '@/types/user'
import { UserTokens } from '@/types/UserTokens'

const urls = {
  user: {
    auth: {
      login: 'user/auth/login',
      logout: 'user/auth/logout',
      nonce: 'user/auth/nonce'
    },
    users: {
      profile: 'user/users/profile',
      address: 'user/users/address'
    },
    trees: {
      tokens: 'forest/tokens/my?page=1&limit=10',
      token: 'forest/token/'
    }
  }
}

export const api = {
  url: backend.defaults.baseURL,
  user: {
    auth: {
      login: {
        url: urls.user.auth.login
      },
      logout: {
        url: urls.user.auth.logout
      },
      nonce: {
        url: urls.user.auth.nonce
      }
    },
    users: {
      profile: {
        url: urls.user.users.profile,
        request: async (): Promise<AxiosResponse<User>> => {
          try {
            return await backend.get(
              urls.user.users.profile,
              {
                withCredentials: true
              })
          } catch (error: any) {
            return error.response as AxiosResponse
          }
        }
      },
      tokens: {
        url: urls.user.users.address,
        request: async (getMyTokensInterval: undefined | NodeJS.Timer = undefined): Promise<UserTokens> => {
          try {
            return await backend.get(
              urls.user.trees.tokens,
              {
                withCredentials: true
              }).then(response => {
                if (response.status === 200) {
                  if (response.data?.items.length > 0) {
                    clearInterval(getMyTokensInterval as NodeJS.Timeout)
                    window.location.href = `/token/${response.data?.items[0].token}`
                  }
                } else {
                  clearInterval(getMyTokensInterval as NodeJS.Timeout)
                }
                return response?.data
              }).catch(r => {
                console.error(r.message)
                clearInterval(getMyTokensInterval as NodeJS.Timeout)
              })
          } catch (error: any) {
            return error.response
          }
        }
      },
      logout: {
        request: async () => {
          try {
            return await backend.post(
              urls.user.auth.logout, {},
              {
                withCredentials: true
              })
          } catch {
            // TODO Handle errors. Now do nothing (perfect scenario)
          }
        }
      }
    }
  }
}

export default api