import axios from 'axios';
import { CONFIG } from '@/shared/config';
import { useAuthStore } from '../lib/store/auth.store';

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
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
        const response = await axiosInstance.post('/api/Auth/refresh');
        const { Token, Expiration } = response.data;

        sessionStorage.setItem('accessToken', Token);
        sessionStorage.setItem('tokenExpiration', Expiration);

        originalRequest.headers.Authorization = `Bearer ${Token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('tokenExpiration');
        useAuthStore.getState().setUser(null);
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
