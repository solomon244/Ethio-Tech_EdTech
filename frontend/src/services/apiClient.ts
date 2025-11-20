import axios, { type AxiosRequestConfig } from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
export const ACCESS_TOKEN_KEY = 'ethio-tech-hub:access';
export const REFRESH_TOKEN_KEY = 'ethio-tech-hub:refresh';

const getStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const setAuthHeader = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};

const persistTokens = (accessToken: string, refreshToken: string) => {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  setAuthHeader(accessToken);
};

export const clearStoredTokens = () => {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(ACCESS_TOKEN_KEY);
  storage.removeItem(REFRESH_TOKEN_KEY);
  setAuthHeader(null);
};

const refreshTokens = async () => {
  const storage = getStorage();
  const refreshToken = storage?.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    throw new Error('Missing refresh token');
  }

  const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
  const {
    data: {
      tokens: { accessToken, refreshToken: nextRefreshToken },
    },
  } = response.data;
  persistTokens(accessToken, nextRefreshToken);
  return accessToken;
};

apiClient.interceptors.request.use((config) => {
  const storage = getStorage();
  const token = storage?.getItem(ACCESS_TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type RetryableAxiosRequestConfig = AxiosRequestConfig & { _retry?: boolean };

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config as RetryableAxiosRequestConfig;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshTokens();
        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        clearStoredTokens();
        return Promise.reject(refreshError);
      }
    }

    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export { apiClient as default, persistTokens, setAuthHeader };

