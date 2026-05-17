import axios from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: "https://upskilling-egypt.com:3003/api/v1",
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