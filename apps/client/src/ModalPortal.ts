import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

export const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
  const modalElement = document.getElementById('modal');
  if (!modalElement) {
    return null;
  }
  return ReactDOM.createPortal(children, modalElement);
};
