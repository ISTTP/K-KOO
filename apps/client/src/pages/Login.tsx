import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Wrapper from '#components/layout/Wrapper.tsx';
import Button from '#components/common/Button.tsx';
import axiosInstance from '#apis/axios.ts';
import { AxiosError } from 'axios';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';

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
        if (error instanceof AxiosError) {
          if (error.response?.status === 500) {
            alert('오류가 발생했습니다, 새로고침 해주세요.');
          }
        }
      }
    }

    handleTokenValidation();
  }, []);

  return (
    <Wrapper>
      <InnerWrapper>
        <h1>케이꾸</h1>
        <Link to="/signup">Sign Up</Link>
        <Button
          type="kakao"
          onClick={handleKakaoLogin}
        >
          카카오로 시작하기
        </Button>
        <Button
          type="google"
          onClick={handleGoogleLogin}
        >
          구글로 시작하기
        </Button>
      </InnerWrapper>
    </Wrapper>
  );
};

export { Login };
