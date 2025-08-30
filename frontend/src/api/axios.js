import axios from "axios";
import { useAuthStore } from "../store/auth";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
});

// Request interceptor → attach token
API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().access;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor → handle 401s
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const success = await useAuthStore.getState().refreshTokens();
      if (success) {
        const newAccess = useAuthStore.getState().access;
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return API(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
