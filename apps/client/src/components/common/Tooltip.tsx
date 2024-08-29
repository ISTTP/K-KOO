import React from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: var(--orange-500);
  border-radius: 50%;
  cursor: pointer;
  color: white;
  font-size: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &:hover .tooltipText {
    opacity: 1;
    visibility: visible;
  }
`;

const TooltipIcon = styled.div`
  font-size: 1.5rem;
`;

const TooltipText = styled.div`
  position: absolute;
  bottom: 3.5rem;
  right: 0rem;
  background-color: #333;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  opacity: 0;
  width: 20rem;
  font-size: 14px;
  visibility: hidden;

  @media (min-width: 801px) {
    width: 22rem;
  }
`;

interface TooltipProps {
  message: string;
}

const Tooltip: React.FC<TooltipProps> = ({ message }) => {
  return (
    <TooltipContainer>
      <TooltipIcon>?</TooltipIcon>
      <TooltipText className="tooltipText">{message}</TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
