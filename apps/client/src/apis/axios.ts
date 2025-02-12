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


    // 401 에러 응답 (인가 미들웨어에서 모든 토큰이 만료되었을때 401 리턴 -> 로그인 유도)
    if ((axiosError === 401) && (window.location.pathname !== '/')) {
      if (/^\/cake\/[^/]+$/.test(window.location.pathname)) {
        return Promise.reject(error);
      }
      window.location.replace('/');
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
