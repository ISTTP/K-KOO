import React from 'react';
import styled from 'styled-components';
import { GoogleIcon, KakaoIcon } from '#icons';

type ButtonType = 'google' | 'kakao' | 'default' | 'gray' | 'disabled';

const StyledButton = styled.button<{
  $type: ButtonType;
  $size?: string;
  $bgColor: string;
  $textColor: string;
}>`
  width: ${(props) => (props.$size === 'large' ? '100%' : '15rem')};
  height: 3rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => `var(${props.$bgColor})`};
  color: ${(props) => `var(${props.$textColor})`};
  border: ${(props) =>
    props.$type === 'google' ? '1px solid var(--dark-gray-color)' : 'none'};
  border-radius: 0.5rem;
  cursor: ${(props) => (props.$type !== 'disabled' ? 'pointer' : '')};
  font-size: 1rem;
  font-weight: 700;

  svg {
    margin-right: 1rem;
  }
`;

interface ButtonProps {
  type: ButtonType;
  label: string;
  size?: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const buttonStyles = {
  google: {
    bgColor: '--white-color',
    textColor: '--black-color',
    icon: <GoogleIcon height={'1.2rem'} width={'1.2rem'} />,
  },
  kakao: {
    bgColor: '--yellow-color',
    textColor: '--black-color',
    icon: <KakaoIcon height={'1.4rem'} width={'1.4rem'} />,
  },
  default: {
    bgColor: '--orange-color',
    textColor: '--white-color',
    icon: null,
  },
  gray: {
    bgColor: '--light-gray-color',
    textColor: '--dark-gray-color',
    icon: null,
  },
  disabled: {
    bgColor: '--light-gray-color',
    textColor: '--dark-gray-color',
    icon: null,
  },
};

const Button: React.FC<ButtonProps> = ({ type, label, onClick, size }) => {
  const { bgColor, textColor, icon } = buttonStyles[type];

  return (
    <StyledButton
      $type={type}
      $size={size}
      $bgColor={bgColor}
      $textColor={textColor}
      onClick={onClick}
      disabled={type === 'disabled'}
    >
      {icon}
      {label}
    </StyledButton>
  );
};

export default Button;
