import axios from 'axios';
import { CONFIG } from '../config';

export const axiosInstance = axios.create({
  baseURL: CONFIG.API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await axiosInstance.post('/auth/refresh');
        return axiosInstance(error.config);
      } catch (refreshError) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
