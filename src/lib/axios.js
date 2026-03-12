import axios from "axios";

const API_BASE = import.meta.env.VITE_API_PATH;

const AxiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true, 
});


export default AxiosInstance;