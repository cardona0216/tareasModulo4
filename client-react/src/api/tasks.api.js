
import axios from 'axios';



const taskApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tarea/',
})

taskApi.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Función para obtener todas las tareas
export const getAllTasks = async () => {
    const token = localStorage.getItem('accessToken'); // Obtener el token de localStorage

    // Verifica si el token está presente
    if (!token) {
        console.error('No token found in localStorage.');
        return Promise.reject(new Error('No token available.'));
    }

    // Hacer la solicitud GET incluyendo el token en los encabezados
    return taskApi.get('/', {
        headers: {
            Authorization: `Bearer ${token}`, // Incluir el token aquí
        }
    });
};

// Función para obtener una tarea por ID
export const getTask = async (id) => {
    const token = localStorage.getItem('accessToken'); // Obtener el token de localStorage

    // Verifica si el token está presente
    if (!token) {
        console.error('No token found in localStorage.');
        return Promise.reject(new Error('No token available.'));
    }

    // Hacer la solicitud GET incluyendo el token en los encabezados
    try {
        const response = await taskApi.get(`/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Incluir el token aquí
            },
        });
        return response.data; // Devuelve la tarea
    } catch (error) {
        console.error('Error fetching task:', error.response ? error.response.data : error.message);
        throw error; // Propagar el error
    }
};

export const createTask = (task) => {
    const token = localStorage.getItem('accessToken'); // Obtener el token de localStorage

    // Verifica si el token está presente
    if (!token) {
        console.error('No token found in localStorage.');
        return Promise.reject(new Error('No token available.'));
    }

    return taskApi.post('/', task, {
        headers: {
            Authorization: `Bearer ${token}`, // Incluir el token aquí
        }
    });
};
export const updateTask = (id, task) => taskApi.put(`/${id}/`, task)

export const deleteTasks = (id) => taskApi.delete(`/${id}/`)
