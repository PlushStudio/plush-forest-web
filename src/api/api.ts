import backend from './axios'
import { AxiosResponse } from 'axios'
import { User } from '@/types/user'

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
        tokens: {
            token: 'forest/tokens/my?page=1&limit=10',
        }
    }
}

const api = {
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
            token: {
                url: urls.user.users.address,
                request: async (): Promise<AxiosResponse> => {
                    try {
                        return await backend.get(
                          urls.user.tokens.token,
                          {
                              withCredentials: true
                          })
                    } catch (error: any) {
                        return error.response as AxiosResponse
                    }
                }
            }
        }
    }
}

export default api