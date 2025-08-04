import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptores para manejar errores globalmente
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data?.message || 'Error en la solicitud',
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      return Promise.reject({
        message: 'No se recibió respuesta del servidor',
        status: 503
      });
    } else {
      return Promise.reject({
        message: 'Error al configurar la solicitud',
        status: 500
      });
    }
  }
);

export default api;