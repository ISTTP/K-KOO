import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '#components/layout/Wrapper.tsx';
import axiosInstance from '#apis/axios.ts';
import MyCake from '#components/cake/MyCake.tsx';
import SharedCake from '#components/cake/SharedCake.tsx';
import Loading from '#components/common/Loading.tsx';
import { AxiosError } from 'axios';
import { getCakeRes, getUserMeRes } from '@isttp/schemas/all';
import { useParams } from 'react-router-dom';


const Cake = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const [isMyCake, setIsMyCake] = useState(false);
  const [cakeUserData, setCakeUserData] = useState<getCakeRes>();

  if (!ownerId) { return ('에러') }

  async function checkIsMyCake(ownerId: string) {
    try {
      const res = await axiosInstance.get<getUserMeRes>('/user/me');
      const result = getUserMeRes.parse(res.data);
      if (result.userId === ownerId) {
        setIsMyCake(true);
      } else {
        setIsMyCake(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsMyCake(false);
        }
        if (error.response?.status === 500) {
          alert('현재 유저 정보를 불러오는데 실패했습니다. 새로고침 해주세요.');
        }
      }
    }
  }

  async function getCakeOwnerInfo(ownerId: string) {
    try {
      const res = await axiosInstance.get<getCakeRes>(`cake/${ownerId}`);
      const result = getCakeRes.parse(res.data);
      setCakeUserData(result);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          alert('잘못된 케이크 주소입니다.');
          navigate('/');
        }
        if (error.response?.status === 500) {
          alert(
            '케이크 소유자 정보를 불러오는데 실패했습니다. 새로고침 해주세요.',
          );
        }
      }
    }
  }

  useEffect(() => {
    checkIsMyCake(ownerId);
    getCakeOwnerInfo(ownerId);
  }, [ownerId]);

  if (!cakeUserData) {
    return <Loading />;
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

export { Cake };
