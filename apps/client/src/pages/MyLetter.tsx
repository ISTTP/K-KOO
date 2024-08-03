import Wrapper from '#components/layout/Wrapper.tsx'
import React, { useState } from 'react'
import GridInfo from '#components/cake/GridInfo.tsx';
import { ArrowBackIcon } from '#icons';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MyLetter = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  function handleBack() {
    navigate(-1);
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <Header>
          <ArrowBackIcon onClick={handleBack} />
          <h1>내가 작성한 편지함</h1>
          <p>총 <span>{count}</span>개의 편지를 남겼어요!</p>
        </Header>
        <GridInfo year="all" handleTotalChange={(total) => setCount(total)} />
      </InnerWrapper>
    </Wrapper>
  )
}

export { MyLetter }

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;

  h1{
    color: var(--black);
    text-align: center;
    font-family: "ONE Mobile POP";
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 39px 0 7px 8px;
  }

  p{
    color: var(--black);
    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0 0 58px 8px;
  }

  span{
    color: var(--orange-500);
  }
`
