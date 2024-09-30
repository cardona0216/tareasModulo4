
import axios from "axios";


const authApi = axios.create({
    baseURL: 'http://localhost:8000'
})

export const login = (credentials) => {
    return authApi.post('/login', credentials)
}

export const register = (credentials) => {
    return authApi.post('/register', credentials)
}

