import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StyledLink from '#components/common/StyledLink.tsx';
import Wrapper from '#components/layout/Wrapper.tsx';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';
import Button from '#components/common/Button.tsx';
import Input from '#components/common/Input.tsx';
import styled from 'styled-components';
import axiosInstance from '#apis/axios.ts';
import { AxiosError } from 'axios';


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
        <Title>케이꾸</Title>
        <SubTitle>케이크를 꾸미고 생일을 축하해요 🎉</SubTitle>

        <FormContainer>
          <Input $isValid={true} type="text" placeholder="아이디" maxLength={20} />
          <Input $isValid={true} type="text" placeholder="비밀번호" maxLength={20} />
          <Button
            type="default"
            onClick={() => { }}>
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
            <StyledLink to="/signup">아이디 찾기</StyledLink>
            <StyledLink to="/signup">비밀번호 찾기</StyledLink>
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


