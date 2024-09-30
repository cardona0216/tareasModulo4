import axios from "axios";

const reservaApi = axios.create({
    baseURL: 'http://localhost:8000/reserva/api/v1/reserva/'
});


reservaApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`
    }
    return config;
} , error => {
    return Promise.reject(error)
});

export const getAllReservas = () => {
    return reservaApi.get('/');
};

export const getReservas = (id) => {
    return reservaApi.get(`/${id}/`)
}

export const deleteReserva = (id) => {
    return reservaApi.delete(`/${id}/`)
}

export const getReservaById = async (id) => {
    try {
      const response = await reservaApi.get(`${id}`);
      return response;
    } catch (error) {
      console.error('Error al obtener la reserva:', error);
      throw error;
    }
};

export const updateReserva = async (id, reserva) => {
    try {
        console.log('Datos a enviar:', reserva); // Para depurar
        const response = await reservaApi.put(`${id}/`, reserva);
        return response;
    } catch (error) {
        console.error('Error al actualizar la reserva:', error.response ? error.response.data : error.message);
        throw error;
    }
};
