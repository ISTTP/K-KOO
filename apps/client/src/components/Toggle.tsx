import React from 'react';
import styled, { css } from 'styled-components';

interface ToggleBtnProps {
  toggle: boolean;
  onClick: () => void;
}

interface Proptype {
  isToggle: boolean;
}

const Toggle: React.FC<ToggleBtnProps> = ({ toggle, onClick }) => (
  <Container>
    <ToggleBtn onClick={onClick} isToggle={toggle}>
      <Circle isToggle={toggle} />
    </ToggleBtn>
    <button>케이크 수정</button>
  </Container>
);

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
    !props.isToggle ? 'none' : 'var(--light-gray-color)'};
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
    props.isToggle &&
    css`
      transform: translate(24px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;
