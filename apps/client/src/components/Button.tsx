import React from "react";
import styled from "styled-components";
import GoogleIcon from "../assets/icons/GoogleIcon";
import KakaoIcon from "../assets/icons/KakaoIcon";

type ButtonType = "google" | "kakao" | "default";

const StyledButton = styled.button<{
  $type: ButtonType;
  $bgColor: string;
  $textColor: string;
}>`
  width: 15rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => `var(${props.$bgColor})`};
  color: ${(props) => props.$textColor};
  border: ${(props) =>
    props.$type === "google" ? "1px solid var(--dark-gray-color)" : "none"};
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;

  svg {
    margin-right: 1rem;
  }
`;

interface ButtonProps {
  type: ButtonType;
  label: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const buttonStyles = {
  google: {
    bgColor: "--white-color",
    textColor: "--black-color",
    icon: <GoogleIcon height={"1.2rem"} width={"1.2rem"} />,
  },
  kakao: {
    bgColor: "--yellow-color",
    textColor: "--black-color",
    icon: <KakaoIcon height={"1.4rem"} width={"1.4rem"} />,
  },
  default: {
    bgColor: "--orange-color",
    textColor: "--white-color",
    icon: null,
  },
};

const Button: React.FC<ButtonProps> = ({ type, label, onClick }) => {
  const { bgColor, textColor, icon } = buttonStyles[type];

  return (
    <StyledButton
      $type={type}
      $bgColor={bgColor}
      $textColor={textColor}
      onClick={onClick}
    >
      {icon}
      {label}
    </StyledButton>
  );
};

export default Button;
