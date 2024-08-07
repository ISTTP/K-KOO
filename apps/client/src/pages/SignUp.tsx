import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Wrapper from '#components/layout/Wrapper.tsx';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';
import ArrowBackIcon from '../assets/icons/ArrowBackIcon';
import { IdForm, PasswordForm, EmailForm, NicknameForm, BirthdayForm } from '#components/signup/index.ts';

const SignUp = () => {
  const navigate = useNavigate();
  const { step } = useParams();

  return (
    <Wrapper>
      <InnerWrapper>
        <NavWrapper>
          <ArrowBackIcon onClick={() => navigate(-1)} />
        </NavWrapper>

        {step === 'id' && <IdForm />}
        {step === 'password' && <PasswordForm />}
        {step === 'email' && <EmailForm />}
        {step === 'nickname' && <NicknameForm />}
        {step === 'birthday' && <BirthdayForm />}
      </InnerWrapper>
    </Wrapper >
  );
};

export { SignUp };

const NavWrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
