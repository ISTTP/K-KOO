import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axios';
import Wrapper from '../components/Wrapper';

type ResponseType = {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  id?: string;
  loginType?: string;
} | null;

const GoogleLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();
  const [response, setResponse] = useState<ResponseType>(null);

  async function transferCodeToServer(code: string) {
    const res = await axiosInstance.post('/auth/google/login', {
      code,
    });
    return res.data;
  }

  useEffect(() => {
    if (code) {
      transferCodeToServer(code).then(setResponse);
    }
  }, [code]);

  useEffect(() => {
    if (!response) return;
    switch (response.success) {
      case true:
        navigate('/cake');
        break;
      case false:
        navigate('/signup', {
          state: { loginType: response.loginType, id: response.id },
        });
        break;
    }
  }, [response]);

  return (
    <Wrapper>
      <h1>구글 로그인</h1>
      <p>로딩중...</p>
    </Wrapper>
  );
};

export default GoogleLogin;
