import axios from 'axios';

const backend = axios.create({
    baseURL: window.config.API_URL ?? 'http://localhost:8080'
});

export default backend;