import React, { SVGProps } from 'react';

const DropDownIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      fill='none'
    >
      <path
        d="M6 9.5L12 15.5L18 9.5"
        stroke="#FFA83C"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>
  );
};

export default DropDownIcon;
