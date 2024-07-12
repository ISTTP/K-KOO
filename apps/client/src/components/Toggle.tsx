import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface ToggleBtnProps {
  ownerId: string;
  toggle: boolean;
  onClick: () => void;
}

interface Proptype {
  $istoggle: boolean;
}

const Toggle: React.FC<ToggleBtnProps> = ({ ownerId, toggle, onClick }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ToggleBtn onClick={onClick} $istoggle={toggle}>
        <Circle $istoggle={toggle} />
      </ToggleBtn>
      <button onClick={() => navigate(`/cake/create/${ownerId}`)}>
        케이크 수정
      </button>
    </Container>
  );
};

export default Toggle;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
`;

const ToggleBtn = styled.button<Proptype>`
  width: 50px;
  height: 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    !props.$istoggle ? 'none' : 'var(--light-gray-color)'};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const Circle = styled.div<Proptype>`
  background-color: var(--orange-color);
  width: 30px;
  height: 30px;
  border-radius: 30px;
  position: absolute;
  left: 0;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.$istoggle &&
    css`
      transform: translate(24px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;
