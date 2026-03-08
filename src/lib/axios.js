import axios from "axios";
const API_BASE = import.meta.env.VITE_API_PATH;

const AxiosInstance = axios.create({
  baseURL: API_BASE,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;