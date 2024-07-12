import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    async function handleTokenValidation() {
      try {
        const res = await axiosInstance.get('/user/me');
        if (res.status === 200) {
          navigate(`/cake/${res.data.userId}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleTokenValidation();
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
