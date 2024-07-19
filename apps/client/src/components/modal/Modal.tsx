import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalContainer = styled.div`
  background-color: var(--white-color);
  padding: 1rem;
  border-radius: 10px;
  z-index: 101;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Modal = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Overlay open={open}>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>
  );
};

export default Modal;
