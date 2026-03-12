import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = import.meta.env.VITE_API_PATH;

const AxiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default AxiosInstance;
