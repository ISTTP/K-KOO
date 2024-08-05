import React from 'react';
import styled from 'styled-components';
import { ModalPortal } from '../../ModalPortal';

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
  background-color: var(--white);
  padding: 1rem;
  border-radius: 10px;
  z-index: 101;
  width: 360px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  span {
    color: var(--black, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5;
    padding: 29px 18px;
  }
`;

const Modal = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  return (
    <ModalPortal>
      <Overlay open={open}>
        <ModalContainer>{children}</ModalContainer>
      </Overlay>
    </ModalPortal>
  );
};

export default Modal;
