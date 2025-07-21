import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http:localhost:3000',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosInstance.interceptors.request.use(config => {
//   // Modify config before request is sent
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// axiosInstance.interceptors.response.use(response => {
//   // Handle response data
//   return response;
// }, error => {
//   return Promise.reject(error);
// });

export default axiosInstance;
