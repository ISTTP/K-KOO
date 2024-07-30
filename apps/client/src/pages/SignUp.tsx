import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Wrapper from '#components/layout/Wrapper.tsx';
import Button from '#components/common/Button.tsx';
import axiosInstance from '#apis/axios.ts';
import { AxiosError } from 'axios';
import { getFcmToken } from '#firebase';

interface SignUpProps {
  id: string;
  loginType: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, loginType } = location.state as SignUpProps;
  const [nickname, setNickname] = useState('');
  const [birthday, setBirthday] = useState('');

  async function handleSignup() {
    if (!nickname || !birthday) {
      alert('닉네임과 생일을 모두 입력해주세요');
      return;
    }
    try {
      const response = await axiosInstance.post(
        '/auth/signup',
        {
          nickname,
          birthday: `${birthday}T00:00:00.000Z`, // ISO 8601
          id,
          loginType,
        },
        { withCredentials: true },
      );
      if (response.status === 200) {
        alert('회원가입이 완료되었습니다.');
        if (Notification.permission === 'granted') {
          getFcmToken();
        }
        navigate(`/cake/${response.data.userId}`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert('회원가입에 실패했습니다.');
      }
    }
  }
  return (
    <Wrapper>
      <h1>Sign Up</h1>
      <Input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <Button type="default" onClick={handleSignup}>
        확인
      </Button>
      <Link to="/">Login</Link>
    </Wrapper>
  );
};

export { SignUp };

const Input = styled.input`
  width: 100%;
  height: 2rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;
