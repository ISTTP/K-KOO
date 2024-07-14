import React, { useState, useEffect } from 'react';
import Wrapper from '#components/Wrapper.tsx';
import axiosInstance from '#apis/axios.ts';
import MyCake from '#components/cake/MyCake.tsx';
import SharedCake from '#components/cake/SharedCake.tsx';
import { CakeUserTypeResponse } from '@isttp/schemas/all';
import { useParams } from 'react-router-dom';

const Cake = () => {
  const { ownerId } = useParams();
  const [isMyCake, setIsMyCake] = useState(false);
  const [cakeUserData, setCakeUserData] = useState<CakeUserTypeResponse>();

  async function chooseVersion(ownerId: string) {
    const res = await axiosInstance.get(`cake/version?cakeUserId=${ownerId}`);
    const data = CakeUserTypeResponse.parse(res.data.data);
    setCakeUserData(data);

    if (res.data.userId === ownerId) {
      setIsMyCake(true);
    }
  }

  useEffect(() => {
    chooseVersion(ownerId);
  }, [ownerId]);

  if (!cakeUserData) {
    return <div>에러처리 해주기</div>;
  }

  return (
    <Wrapper>
      {isMyCake ? (
        <MyCake ownerId={ownerId} data={cakeUserData} />
      ) : (
        <SharedCake ownerId={ownerId} data={cakeUserData} />
      )}
    </Wrapper>
  );
};

export default Cake;
