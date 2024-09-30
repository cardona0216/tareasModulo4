
import axios from 'axios';



const taskApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tarea/'
})

taskApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const getAllTasks = () => {
    return taskApi.get('/')
}

export const getTask = (id) => {
    return taskApi.get(`/${id}/`)
}

export const createTask = (task) => {
    return taskApi.post('/', task)
}

export const deleteTasks = (id) => taskApi.delete(`/${id}/`)

export const updateTask = (id, task) => taskApi.put(`/${id}/`, task)