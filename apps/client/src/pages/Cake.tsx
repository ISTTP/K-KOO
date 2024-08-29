import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import MyCake from '#components/cake/MyCake.tsx';
import SharedCake from '#components/cake/SharedCake.tsx';
import Loading from '#components/common/Loading.tsx';
import Sidebar from '#components/cake/Sidebar.tsx';
import { AxiosError } from 'axios';
import { getCakeRes, user } from '@isttp/schemas/all';
import { useParams } from 'react-router-dom';
import * as S from '#styles/SidebarStyle.tsx';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';
import Tooltip from '#components/common/Tooltip.tsx';
import Confetti from 'react-confetti'

const Cake = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const [isMyCake, setIsMyCake] = useState(false);
  const [cakeUserData, setCakeUserData] = useState<getCakeRes>();
  const [confettiRecycle, setConfettiRecycle] = useState(true);

  if (!ownerId) { return ('에러') }

  async function checkIsMyCake(ownerId: string) {
    try {
      const res = await axiosInstance.get<user>('/user/me');
      const result = user.parse(res.data);
      const userId = result.userId;

      userId === ownerId
        ? setIsMyCake(true)
        : setIsMyCake(false);
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

    setTimeout(() => {
      setConfettiRecycle(false)
    }, 5000)
  }, [ownerId]);

  if (!cakeUserData) {
    return <Loading />;
  }

  return (
    <S.SideWrapper>
      <Sidebar isMyCake={isMyCake} />
      <S.Wrapper>
        {cakeUserData.isBirthday &&
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            gravity={0.1}
            opacity={0.8}
            numberOfPieces={100}
            recycle={confettiRecycle}
          />
        }
        <InnerWrapper>
          {isMyCake ? (
            <MyCake ownerId={ownerId} data={cakeUserData} />
          ) : (
            <SharedCake ownerId={ownerId} data={cakeUserData} />
          )}
          <Tooltip
            message={`생일로부터 30일이 지나면 올해 생일 장식초는 사라져요. 지난 생일의 장식초는 리스트에서 계속 확인할 수 있어요.`}
          />
        </InnerWrapper>
      </S.Wrapper>
    </S.SideWrapper>
  );
};

export { Cake };
