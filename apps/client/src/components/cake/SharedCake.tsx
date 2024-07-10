import React from 'react';
import CakeInfo from '#components/cake/CakeInfo.tsx';
import Wrapper from '#components/Wrapper.tsx';
import { CakeUserTypeResponse } from '@isttp/types/all';

interface MyCakeProps {
  data: CakeUserTypeResponse;
}

const SharedCake: React.FC<MyCakeProps> = ({ data }) => {
  console.log(data);

  return (
    <Wrapper>
      <h3>{data.nickname} 님의 케이크</h3>
      <p>친구의 케이크를 꾸며보세요!</p>

      <CakeInfo />
    </Wrapper>
  );
};

export default SharedCake;
