import React from 'react';
import * as C from '#styles/CakeStyle.tsx';
import { useNavigate } from 'react-router-dom';
import { PersonIcon } from '#icons';
import useIsPC from '#hooks/useIsPc.tsx';

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
    <C.HeaderContainer>
      <C.TitleContainer>
        <C.Title>
          <C.Nickname>{nickname}</C.Nickname>
          <C.Phrase>님의 케이크</C.Phrase>
        </C.Title>
        {isMyCake && (
          <C.MyPageButton
            onClick={() => {
              navigate('/mypage');
            }}
          >
            {!isPC && (<PersonIcon viewBox="0 0 31 38" />)}
          </C.MyPageButton>
        )}
      </C.TitleContainer>
      {isMyCake && <C.SubTitle>장식초를 눌러 편지를 확인해보세요✉️</C.SubTitle>}
      {!isMyCake && <C.SubTitle>친구의 케이크를 꾸며보세요❤️</C.SubTitle>}
    </C.HeaderContainer>
  );
};

export default CakeHeader;
