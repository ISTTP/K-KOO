import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import Wrapper from '#components/Wrapper.tsx';

type ResponseType = {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  id?: string;
  userId?: string;
  loginType?: string;
} | null;

const KakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();
  const [response, setResponse] = useState<ResponseType>(null);

  async function transferCodeToServer(code: string) {
    const res = await axiosInstance.post('/auth/kakao/login', {
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
        navigate(`/cake/${response.userId}`);
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
      <h1>카카오로그인</h1>;
    </Wrapper>
  );
};

export default KakaoLogin;
