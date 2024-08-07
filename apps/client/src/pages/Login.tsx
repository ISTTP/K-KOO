import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import StyledLink from '#components/common/StyledLink.tsx';
import Wrapper from '#components/layout/Wrapper.tsx';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';
import Button from '#components/common/Button.tsx';
import Input from '#components/common/Input.tsx';
import * as S from '#styles/SignUpStyle.ts'

import axiosInstance from '#apis/axios.ts';
import { AxiosError } from 'axios';
import { ButtonType } from '@isttp/types/all';
import { hashPassword } from '#utils';


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
  const submitButton = useRef<HTMLButtonElement>(null);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [buttonType, setButtonType] = useState<ButtonType>('default');

  async function handleLogin(id: string, password: string) {
    setButtonType('loading');

    try {
      const hashedPassword = hashPassword(password);
      const res = await axiosInstance.post('/auth/login', {
        id,
        password: hashedPassword,
      });

      if (res.status === 200) {
        if (res.data.success) {
          window.location.href = `/cake/${res.data.userId}`;
        } else {
          setButtonType('default');
          setIsValid(false);
        }
      }
    } catch (error) {
      setButtonType('default');
      setIsValid(false);
    }
  }

  function handleEnterKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleLogin(id, password);
    }
  }

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

  useEffect(() => {
    window.addEventListener('keydown', handleEnterKeyDown);

    return () => {
      window.removeEventListener('keydown', handleEnterKeyDown);
    }
  }, [buttonType])

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>케이꾸</Title>
        <SubTitle>케이크를 꾸미고 생일을 축하해요 🎉</SubTitle>

        <FormContainer>
          <Input
            autoFocus
            $isValid={true}
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
            maxLength={20} />
          <Input
            $isValid={true}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            maxLength={20} />

          {!isValid && <S.Warning>아이디 또는 비밀번호가 일치하지 않습니다.</S.Warning>}

          <Button
            ref={submitButton}
            type={buttonType}
            onClick={() => {
              handleLogin(id, password);
            }}>
            로그인
          </Button>
        </FormContainer>

        <LinkContainer>
          <StyledLink
            to="/signup/id"
            state={{ id: undefined, loginType: 'default' }}>
            회원가입
          </StyledLink>
          <LinkAside>
            <StyledLink to="/find/id/enter">
              아이디 찾기
            </StyledLink>
            <StyledLink to="/find/pwd">
              비밀번호 찾기
            </StyledLink>
          </LinkAside>
        </LinkContainer>

        <SocialLoginContainer>
          <Button
            type="kakao"
            onClick={handleKakaoLogin}
          >
            카카오로 로그인
          </Button>
          <Button
            type="google"
            onClick={handleGoogleLogin}
          >
            구글로 로그인
          </Button>
        </SocialLoginContainer>

      </InnerWrapper>
    </Wrapper>
  );
};

export { Login };

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;

const SubTitle = styled.h2`
  font-family: OneMobilePop, sans-serif;
  font-size: 1.06rem;
  font-weight: 400;
`;

const FormContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2.6rem;
  gap: 1.25rem;
`;

const LinkContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const LinkAside = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLoginContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  gap: 1.25rem;
`;


