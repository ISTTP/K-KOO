import React, { useState, useEffect } from 'react';
import Wrapper from '#components/Wrapper.tsx';
import axiosInstance from '#apis/axios.ts';
import MyCake from '#components/cake/MyCake.tsx';
import SharedCake from '#components/cake/SharedCake.tsx';
import { CakeUserTypeResponse } from '@isttp/types/all';
import { useParams } from 'react-router-dom';

const Cake = () => {
  const { cakeUserId } = useParams();
  const [isMyCake, setIsMyCake] = useState(false);
  const [cakeUserData, setCakeUserData] = useState<CakeUserTypeResponse>();

  async function test() {
    const res = await axiosInstance.get('/user/me');
    console.log(res.data);
  }

  async function chooseVersion() {
    const res = await axiosInstance.get(
      `cake/version?cakeUserId=${cakeUserId}`,
    );
    setCakeUserData(res.data.data);
    if (res.data.userId.userId === cakeUserId) {
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
      <button onClick={test}>test</button>
    </Wrapper>
  );
};

export default Cake;
