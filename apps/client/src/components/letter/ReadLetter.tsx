import React from 'react';
import styled from 'styled-components';
import Button from '#components/common/Button.tsx';

interface LetterProps {
  isOpen: boolean;
  handleClose: () => void;
  nickname: string;
  contents: string;
  candleImageUrl: string;
  keyword: string;
}

const ReadLetter: React.FC<LetterProps> = ({
  isOpen,
  handleClose,
  nickname,
  contents,
  candleImageUrl,
  keyword
}) => {
  if (!isOpen) return null;

  return (
    <Container>
      <Content>
        <CandleImg src={candleImageUrl} alt="장식초" />
        <p className='nickname'>From. {nickname}</p>
        <p className='keyword'>#{keyword}</p>
        <p className='contents'>{contents}</p>
        <Button
          type="default"
          onClick={handleClose}
        >
          닫기
        </Button>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  //background: var(--gray-200, rgba(222, 222, 222, 0.5));
  backdrop-filter: blur(2.5px);
`;

const Content = styled.div`
  background: var(--white);
  padding: 20px;
  max-width: 360px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--gray-300, #ECECEC);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    text-align: center;
    font-size: 17px;
    font-style: normal;
    line-height: normal;
  }

  .nickname {
    margin: 50px 0 12px 0;
    color: var(--orange-500, #FFA83C);
    font-family: "ONE Mobile POP";
    font-weight: 400;
  }

  .keyword {
    font-size: 14px;
    padding: 4px 12px;
    color: var(--black);
    border-radius: 10px;
    background: var(--orange-500);
    color: var(--white, #FFF);
    text-align: center;
    font-family: 'Pretendard';
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .contents {
    color: var(--black, #000);
    font-family: Pretendard;
    font-weight: 500;
    margin: 16px 0;
    max-height: 254px;
    overflow-y: auto;
  }

  .contents::-webkit-scrollbar {
    width: 8px;
  }

  .contents::-webkit-scrollbar-thumb {
    background: var(--orange-500, #FFA83C);
    border-radius: 10px;
  }

  .contents::-webkit-scrollbar-track {
    background: var(--orange-100, #FFF7ED);
  }
`;

const CandleImg = styled.img`
  width: 85px;
  height: 85px;
  border-radius: 50%;
  position: absolute;
  top: -40px;
  background: var(--orange-100, #FFF7ED);
  border: 4px solid var(--orange-500, #ECECEC);
`;

export default ReadLetter;
