import axios from 'axios';
import api from '@/api/api'

const backend = axios.create({
    // @ts-ignore
    baseURL: import.meta.env.VITE_API_URL
});

const logout = () => {
    axios.post(`${api.url}/${api.user.auth.logout.url}`, {}, {withCredentials: true})
      .then(response => (response && window.location.reload()))
}

export default backend;
export {logout}