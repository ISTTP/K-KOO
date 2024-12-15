import React, { SVGProps } from 'react';

const PrevIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14 7L9 12L14 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      />
    </svg>
  );
};

export default PrevIcon;
