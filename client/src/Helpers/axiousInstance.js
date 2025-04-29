import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});
axiosInstance.interceptors.request.use(async (config) => {
    const token = await localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
export default axiosInstance;
