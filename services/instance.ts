import axios from "axios";


// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ;
const BASE_URL = "https://backend-staging.workfynder.com/api"
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config: any) {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
