import React from 'react';
import styled from 'styled-components';

interface LetterProps {
  isOpen: boolean;
  handleClose: () => void;
  nickname: string;
  contents: string;
  candleImageUrl: string;
}

const ReadLetter: React.FC<LetterProps> = ({
  isOpen,
  handleClose,
  nickname,
  contents,
  candleImageUrl,
}) => {
  if (!isOpen) return null;

  return (
    <Container>
      <Content>
        <img style={{ width: '30px' }} src={candleImageUrl} alt="장식초" />
        <p>From. {nickname}</p>
        <p>{contents}</p>
        <button onClick={handleClose}>닫기</button>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 240px;
  width: 100%;
`;

export default ReadLetter;