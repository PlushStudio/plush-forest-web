import axios from 'axios'

const backend = axios.create({
  baseURL: window.config.API_URL ?? import.meta.env.VITE_BASE_URL
})

export default backend
