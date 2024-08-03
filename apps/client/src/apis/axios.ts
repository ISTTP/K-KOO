import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const customError = error as AxiosError;
    const axiosError = customError.response?.status as number;


    // 401 에러 응답
    if (axiosError === 401) {
      return Promise.reject(error);
    }

    // 500 에러 응답
    if (axiosError === 500) {
      console.log('서버 오류');
      return Promise.reject(error);
    }

    // 400, 404 에러 응답
    if (axiosError === 404 || 400) {
      return Promise.reject(error);
    }


    return Promise.reject(error);
  },
);


export default axiosInstance;
