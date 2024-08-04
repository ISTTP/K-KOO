import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Wrapper from '#components/layout/Wrapper.tsx';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';
import ArrowBackIcon from '../assets/icons/ArrowBackIcon';
import { EnterEmail, VerifyEmail } from '#components/findId/index.ts';

const FindId = () => {
  const navigate = useNavigate();
  const { step } = useParams();

  return (
    <Wrapper>
      <InnerWrapper>
        <NavWrapper>
          <ArrowBackIcon onClick={() => navigate(-1)} />
        </NavWrapper>

        {step === 'enter' && <EnterEmail />}
        {step === 'verify' && <VerifyEmail />}
      </InnerWrapper>
    </Wrapper >
  );
};

export { FindId };

const NavWrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
