import backend from './axios'
import { AxiosResponse } from 'axios';
import { User } from '@/types/user';

const urls = {
    user: {
        auth: {
            login: 'user/auth/login',
            nonce: 'user/auth/nonce'
        },
        users: {
            profile:'user/users/profile'
        }
    }
};

const api = {
    url: backend.defaults.baseURL,
    user: {
        auth: {
            login: {
                url: urls.user.auth.login
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
            }
        }
    }
};


export default api