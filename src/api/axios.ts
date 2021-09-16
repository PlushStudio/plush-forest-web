import axios from 'axios';

const backend = axios.create({
    // @ts-ignore
    baseURL: import.meta.env.VITE_API_URL
});

export default backend;
