import styled from 'styled-components';

const TitleWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-top: 10.25rem;
  gap: 1.5rem;
`;

const Title = styled.h1`
  color: var(--black);
`;

const SubTitle = styled.h2`
  color: var(--orange-500);
`;

const InputWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1.25rem;
`;

const WarningWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin: 1rem 0;
  gap: 0.25rem;
`;

const Warning = styled.p`
  color: var(--magenta);
  font-size: 0.875rem;
  font-weight: 500;
`;

const InputInnerWrapper = styled.section`
  display: flex;  
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ResendButton = styled.button`
  width: 12rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--orange-500);
  color: var(--white);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-family: Pretendard, sans-serif;
  font-size: 1.06rem;
  font-weight: 700;

  &:hover {
    opacity: 0.8;
  }
  
  &:disabled {
    background-color: var(--orange-400);
    cursor: not-allowed;
  }
`

export {
  InputWrapper,
  WarningWrapper,
  Warning,
  TitleWrapper,
  Title,
  SubTitle,
  InputInnerWrapper,
  ResendButton,
}
