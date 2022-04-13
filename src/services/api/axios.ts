import { logoutEvent } from '@/store/auth'
import axios from 'axios'

const backend = axios.create({
  baseURL: window.config.API_URL ?? import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

backend.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      logoutEvent()
    }

    return Promise.reject(error)
  }
)

export default backend
