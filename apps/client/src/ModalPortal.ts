import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

export const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
  const el = document.getElementById('modal');
  if (!el) {
    return null;
  }
  return ReactDOM.createPortal(children, el);
};
