import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

export default axiosInstance;
