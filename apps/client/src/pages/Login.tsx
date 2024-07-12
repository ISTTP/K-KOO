import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '#components/Wrapper.tsx';
import Button from '#components/Button.tsx';
import axiosInstance from '#apis/axios.ts';

async function handleKakaoLogin() {
  const res = await axiosInstance.get('/auth/kakao/url');
  window.location.href = res.data.url;
}

async function handleGoogleLogin() {
  const res = await axiosInstance.post('/auth/google/url');
  window.location.href = res.data.url;
}

const Login = () => {
  useEffect(() => {
    // 로그인이 되어있는 경우 케이크 페이지로 이동 필요
    // 토큰 유효성 검증 API 요청
  }, []);

  return (
    <Wrapper>
      <h1>Login</h1>
      <Link to="/signup">Sign Up</Link>
      <Button
        type="kakao"
        label="Kakao로 시작하기"
        onClick={handleKakaoLogin}
      />
      <Button
        type="google"
        label="Google로 시작하기"
        onClick={handleGoogleLogin}
      />
    </Wrapper>
  );
};

export default Login;
