// write interceptor with axios to add appropriate header to url

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create( {
    baseURL: "https://football-challenge-backend-d58da5a932d9.herokuapp.com"
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config

    },
    (error) => {
        return Promise.reject(error)
    }
);

export default api;