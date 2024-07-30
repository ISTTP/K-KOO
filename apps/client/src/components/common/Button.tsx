import React from 'react';
import styled from 'styled-components';
import { GoogleIcon, KakaoIcon } from '#icons';

type ButtonType =
  | 'google'
  | 'kakao'
  | 'default'
  | 'gray'
  | 'disabled'
  | 'loading';

const StyledButton = styled.button<{
  $type: ButtonType;
  $bgColor: string;
  $textColor: string;
}>`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => `var(${props.$bgColor})`};
  color: ${(props) => `var(${props.$textColor})`};
  border: ${(props) =>
    props.$type === 'google' ? '1px solid var(--gray-400)' : 'none'};
  border-radius: 0.25rem;
  cursor: ${(props) => (props.$type !== 'disabled' ? 'pointer' : '')};
  font-size: 1.05rem;
  font-weight: 700;

  svg {
    margin-right: 1rem;
  }
`;

const ButtonLoading = styled.div`
  margin-left: 1rem;
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--white);
  border-top: 2px solid var(--gray-400);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface ButtonProps {
  type: ButtonType;
  size?: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const buttonStyles = {
  google: {
    bgColor: '--white',
    textColor: '--black',
    icon: <GoogleIcon height={'1.2rem'} width={'1.2rem'} />,
  },
  kakao: {
    bgColor: '--yellow',
    textColor: '--black',
    icon: <KakaoIcon height={'1.4rem'} width={'1.4rem'} />,
  },
  default: {
    bgColor: '--orange-500',
    textColor: '--white',
    icon: null,
  },
  gray: {
    bgColor: '--gray-300',
    textColor: '--gray-400',
    icon: null,
  },
  disabled: {
    bgColor: '--gray-300',
    textColor: '--gray-400',
    icon: null,
  },
  loading: {
    bgColor: '--gray-300',
    textColor: '--gray-400',
    icon: null,
  },
};

const Button: React.FC<ButtonProps> = ({ children, type, onClick }) => {
  const { bgColor, textColor, icon } = buttonStyles[type];

  return (
    <StyledButton
      $type={type}
      $bgColor={bgColor}
      $textColor={textColor}
      onClick={onClick}
      disabled={type === 'disabled' || type === 'loading'}
    >
      {icon}
      {children}
      {type === 'loading' && <ButtonLoading />}
    </StyledButton>
  );
};

export default Button;
