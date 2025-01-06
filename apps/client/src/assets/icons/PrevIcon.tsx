import React, { SVGProps } from 'react';

const PrevIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14 7L9 12L14 17" stroke="white" strokeWidth="2"
      />
    </svg>
  );
};

export default PrevIcon;
