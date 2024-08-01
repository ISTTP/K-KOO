/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';
import type { SVGProps } from 'react';

const ArrowBackIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <IconWrapper>
      <svg {...props} width={'1.7rem'} height={'1.7rem'} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34.1667 18.7918H13.3763L22.9258 9.24225L20.5 6.8335L6.83334 20.5002L20.5 34.1668L22.9088 31.7581L13.3763 22.2085H34.1667V18.7918Z" fill="#FFA83C" />
      </svg>
    </IconWrapper>
  );
}

export default ArrowBackIcon;

const IconWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  hover: {
    opacity: 0.8;
  }
`;
