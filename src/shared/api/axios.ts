import axios from 'axios';
import { CONFIG } from '@/shared/config';

export const axiosInstance = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/api/Auth/refresh'
    ) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post('/api/Auth/refresh');

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    console.error('Response Error:', error);
    if (error.code === 'ERR_NETWORK') {
      console.error('Ошибка сети. Проверьте подключение к серверу.');
      throw new Error('Не удалось подключиться к серверу. Проверьте подключение к интернету.');
    }

    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error('Неверный email или пароль');
        case 403:
          throw new Error('Доступ запрещен');
        case 404:
          throw new Error('Сервер не найден');
        case 500:
          throw new Error('Ошибка сервера');
        default:
          throw new Error(error.response.data?.message || 'Произошла ошибка');
      }
    }

    return Promise.reject(error);
  }
);

export const createCancelableRequest = () => {
  const controller = new AbortController();
  return {
    signal: controller.signal,
    cancel: () => controller.abort(),
  };
};
