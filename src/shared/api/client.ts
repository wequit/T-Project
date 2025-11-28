import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_URL } from "@/shared/config";
import { authApi } from "./auth.api";
import { useAuthStore } from "@/entities/user";
import { isTokenExpired } from "@/shared/lib";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Проактивно обновляет токен если он истек или скоро истечет
 */
const refreshTokenIfNeeded = async (): Promise<string | null> => {
  const token = localStorage.getItem("auth-token");
  
  // Если нет токена, возвращаем null
  if (!token) {
    return null;
  }
  
  // Если токен не истек, возвращаем его
  if (!isTokenExpired(token)) {
    return token;
  }
  
  console.log('🔄 Токен истек, обновляем...');
  
  // Токен истек или скоро истечет, нужно обновить
  const refreshToken = localStorage.getItem("auth-refresh-token");
  
  if (!refreshToken) {
    console.warn('❌ Нет refresh токена, делаем logout');
    useAuthStore.getState().logout();
    return null;
  }
  
  // Если уже идет обновление, ждем его завершения
  if (isRefreshing) {
    console.log('⏳ Ожидание завершения обновления токена...');
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }
  
  isRefreshing = true;
  
  try {
    const response = await authApi.refreshToken(refreshToken);
    const { token: newToken, refreshToken: newRefreshToken } = response;
    
    console.log('✅ Токен успешно обновлен');
    useAuthStore.getState().setTokens(newToken, newRefreshToken);
    processQueue(null, newToken);
    isRefreshing = false;
    
    return newToken;
  } catch (error) {
    console.error('❌ Не удалось обновить токен:', error);
    processQueue(error as AxiosError, null);
    isRefreshing = false;
    useAuthStore.getState().logout();
    return null;
  }
};

apiClient.interceptors.request.use(
  async (config) => {
    // Пропускаем эндпоинты аутентификации
    if (config.url?.includes("/auth/login") || config.url?.includes("/auth/refresh")) {
      return config;
    }
    
    // Проверяем и обновляем токен если нужно
    const token = await refreshTokenIfNeeded();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Логируем ошибку для отладки
    if (error.response?.status && error.response.status >= 400) {
      console.error(`API Error [${error.response.status}]:`, {
        url: originalRequest?.url,
        method: originalRequest?.method,
        data: originalRequest?.data,
        response: error.response?.data,
      });
    }

    // Не пытаемся обновить токен для эндпоинтов аутентификации
    if (originalRequest?.url?.includes("/auth/refresh") || originalRequest?.url?.includes("/auth/login")) {
      return Promise.reject(error);
    }

    // Обрабатываем только 401 (Unauthorized)
    // Проактивная проверка токена в request interceptor предотвратит 500 из-за истекшего токена
    const shouldRefresh = error.response?.status === 401 && !originalRequest._retry;
    
    if (shouldRefresh) {
      console.log('🔐 Получен 401, пытаемся обновить токен...');
      
      // Если уже идет обновление токена, добавляем запрос в очередь
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient.request(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("auth-refresh-token");

      if (!refreshToken) {
        console.warn('❌ Нет refresh токена при 401, делаем logout');
        processQueue(error, null);
        isRefreshing = false;
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      try {
        const response = await authApi.refreshToken(refreshToken);
        const { token: newToken, refreshToken: newRefreshToken } = response;

        console.log('✅ Токен обновлен после 401, повторяем запрос');
        useAuthStore.getState().setTokens(newToken, newRefreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        processQueue(null, newToken);
        isRefreshing = false;

        return apiClient.request(originalRequest);
      } catch (refreshError) {
        console.error('❌ Не удалось обновить токен после 401:', refreshError);
        processQueue(refreshError as AxiosError, null);
        isRefreshing = false;
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
