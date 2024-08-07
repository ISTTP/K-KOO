import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const LinkWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.2rem;
  gap: 1rem;
`;

const LoginLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  background-color: var(--orange-500);
  border-radius: 0.5rem;
  text-decoration: none;
`;

const FindPwdLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--orange-500);
  background-color: var(--white);
  border: 1px solid var(--orange-500);
  border-radius: 0.5rem;
  text-decoration: none;
`;

const LabelWrapper = styled.section`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-300);
  border-radius: 0.5rem;
  gap: 0.5rem;
  padding: 1rem;
  width: 100%;
`;

const Label = styled.span`
  font-size: 1.06rem;
  font-weight: 700;
`;

const SubLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--gray-400);
`;

const TextWrapper = styled.section`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  border-radius: 0.5rem;
  gap: 0.5rem;
  margin-bottom: 2rem;
  width: 100%;
`;

const Text = styled.span`
  font-size: 1.06rem;
  font-weight: 500;
`;

const ColorText = styled.span`
  font-size: 1.06rem;
  font-weight: 700;
  color: var(--orange-500);
`;


export {
  InputWrapper,
  WarningWrapper,
  Warning,
  TitleWrapper,
  Title,
  SubTitle,
  InputInnerWrapper,
  ResendButton,
  LinkWrapper,
  LoginLink,
  FindPwdLink,
  LabelWrapper,
  Label,
  SubLabel,
  TextWrapper,
  Text,
  ColorText,
}
