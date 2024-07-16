import React from 'react';
import styled from 'styled-components';
import { PersonIcon } from '#icons';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SubTitle = styled.span`
  font-size: 1.2rem;
  margin: 0rem;
`;

const Nickname = styled.span`
  color: var(--orange-color);
`;

const MyPageButton = styled.button`
  position: relative;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  border-width: 0;
  display: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  background-color: transparent;

  &:hover {
    opacity: 0.8;
  }
`;

const CakeHeader = ({
  nickname,
  isMyCake,
}: {
  nickname: string;
  isMyCake: boolean;
}) => {
  return (
    <HeaderContainer>
      <TitleContainer>
        <Title>
          <Nickname>{nickname}</Nickname>
          <span>님의 케이크</span>
        </Title>
        {isMyCake && (
          <MyPageButton>
            <PersonIcon width={'100%'} height={'100%'} />
          </MyPageButton>
        )}
      </TitleContainer>
      {isMyCake && <SubTitle>장식초를 눌러 편지를 확인해보세요!</SubTitle>}
      {!isMyCake && <SubTitle>친구의 케이크를 꾸며보세요!</SubTitle>}
    </HeaderContainer>
  );
};

export default CakeHeader;
