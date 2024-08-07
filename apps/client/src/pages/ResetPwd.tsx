import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Wrapper from '#components/layout/Wrapper.tsx';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';
import VerifyPwd from '#components/resetPwd/verifyPwd.tsx';
import SetNewPwd from '#components/resetPwd/setNewPwd.tsx';

import ArrowBackIcon from '../assets/icons/ArrowBackIcon';

const ResetPwd = () => {
  const navigate = useNavigate();
  const { step } = useParams();

  return (
    <Wrapper>
      <InnerWrapper>
        <NavWrapper>
          <ArrowBackIcon onClick={() => navigate(-1)} />
        </NavWrapper>

        {step === 'verify' && <VerifyPwd />}
        {step === 'new' && <SetNewPwd />}

      </InnerWrapper>
    </Wrapper >
  );
};

export { ResetPwd };

const NavWrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
