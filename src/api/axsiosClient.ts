import axios from "axios";
import { toast } from "react-toastify";

export const API_BASE_URL = "https://upskilling-egypt.com:3003";

const axiosClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
});

 axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);

  }
);

axiosClient.interceptors.response.use(
  (response) => {
    toast.success(response.data.message)
    return response;
  },
  (error) => {
        toast.error(error.response.data.message || 'failed')
        return Promise.reject(error)
  }
);

export default axiosClient;