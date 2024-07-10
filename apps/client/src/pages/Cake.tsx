import React, { useState, useEffect } from 'react';
import Wrapper from '#components/Wrapper.tsx';
import axiosInstance from '#apis/axios.ts';
import MyCake from '#components/cake/MyCake.tsx';
import SharedCake from '#components/cake/SharedCake.tsx';
import { CakeUserTypeResponse } from '@isttp/types/all';

const Cake = () => {
  const [isMyCake, setIsMyCake] = useState(false);
  const [cakeUserData, setCakeUserData] = useState<CakeUserTypeResponse>();

  async function chooseVersion() {
    const res = await axiosInstance.get('cake/version?cakeUserId=ynswmsub2m');
    setCakeUserData(res.data.data);
    if (res.data.userId.userId === 'ynswmsub2m') {
      setIsMyCake(true);
    }
  }

  useEffect(() => {
    chooseVersion();
  }, []);

  if (!cakeUserData) {
    return <div>에러처리 해주기</div>;
  }

  return (
    <Wrapper>
      {isMyCake ? (
        <MyCake data={cakeUserData} />
      ) : (
        <SharedCake data={cakeUserData} />
      )}
    </Wrapper>
  );
};

export default Cake;
