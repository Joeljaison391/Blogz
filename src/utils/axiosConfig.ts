import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'http://localhost:5000/api/v2';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  // Important: Include credentials in requests
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;