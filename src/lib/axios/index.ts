import axios from 'axios';


const apiClient = axios.create({
  baseURL: 'https://stuff.201.uz/api/v1',
  timeout: 10000,
  headers:{'Content-Type':'application/json'}
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);





export default apiClient;
