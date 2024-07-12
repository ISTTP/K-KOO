import React, { useState } from 'react';
import Toggle from '#components/Toggle.tsx';
import GridInfo from '#components/GridInfo.tsx';
import CakeInfo from '#components/cake/CakeInfo.tsx';
import Wrapper from '#components/Wrapper.tsx';
import { CakeUserTypeResponse } from '@isttp/types/all';

interface MyCakeProps {
  data: CakeUserTypeResponse;
}

const MyCake: React.FC<MyCakeProps> = ({ data }) => {
  const [toggle, setToggle] = useState(false);

  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <Wrapper>
      <h3>{data.nickname} 님의 케이크</h3>
      <p>장식초를 눌러 편지를 확인해보세요</p>
      <button>my</button>
      <Toggle toggle={toggle} onClick={clickedToggle} />
      {toggle ? <GridInfo /> : <CakeInfo year={data.year} />}
    </Wrapper>
  );
};

export default MyCake;
