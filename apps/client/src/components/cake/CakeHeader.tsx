import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PersonIcon } from '#icons';
import useIsPC from '#hooks/useIsPc.tsx';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  padding-bottom: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-weight: bold;
`;

const SubTitle = styled.h2`
  margin-top: 0.5rem;
`;

const Nickname = styled.h1`
  color: var(--orange-500);
  display: inline;
`;

const Phrase = styled.h1`
  display: inline;
`;

const MyPageButton = styled.button`
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  border-width: 0;
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
  const navigate = useNavigate();
  const isPC = useIsPC(1024);
  return (
    <HeaderContainer>
      <TitleContainer>
        <Title>
          <Nickname>{nickname}</Nickname>
          <Phrase>님의 케이크</Phrase>
        </Title>
        {isMyCake && (
          <MyPageButton
            onClick={() => {
              navigate('/mypage');
            }}
          >
            {!isPC && (<PersonIcon width={'100%'} height={'100%'} viewBox="0 0 31 38" />)}
          </MyPageButton>
        )}
      </TitleContainer>
      {isMyCake && <SubTitle>장식초를 눌러 편지를 확인해보세요✉️</SubTitle>}
      {!isMyCake && <SubTitle>친구의 케이크를 꾸며보세요❤️</SubTitle>}
    </HeaderContainer>
  );
};

export default CakeHeader;
