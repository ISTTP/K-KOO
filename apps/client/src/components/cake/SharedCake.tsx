import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import CakeInfo from '#components/cake/CakeInfo.tsx';
import Wrapper from '#components/Wrapper.tsx';
import Button from '#components/Button.tsx';
import Modal from '#components/modal/Modal.tsx';
import { UserType } from '@isttp/schemas/all';
import { CakeUserTypeResponse, CakeColorType } from '@isttp/types/all';
import { AxiosError } from 'axios';

interface MyCakeProps {
  ownerId: string;
  data: CakeUserTypeResponse;
}

type CakeColorState = {
  sheetColor: CakeColorType;
  creamColor: CakeColorType;
};

const SharedCake: React.FC<MyCakeProps> = ({ ownerId, data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cakeColor, setCakeColor] = useState<CakeColorState>({
    sheetColor: 'chocolate',
    creamColor: 'white',
  });

  async function getColors(userId: string) {
    try {
      const res = await axiosInstance.get(`/cake/color/${userId}`);

      if (!res.data.sheetColor || !res.data.creamColor) return;

      setCakeColor({
        sheetColor: res.data.sheetColor,
        creamColor: res.data.creamColor,
      });
    } catch (error) {
      console.log(error);
      // 에러 코드에 따라 모달
    }
  }

  async function handleCheckLogin() {
    try {
      const res = await axiosInstance.get<UserType>('/user/me');
      if (res.status === 200) {
        navigate(`/letter/choose/${ownerId}`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) setOpen(true);
      }
    }
  }

  async function handleNavigateToMyCake() {
    // 토큰 유효성 확인 후 반환받은 유저 아이디 케이크 페이지로 이동
    axiosInstance
      .get('/user/me')
      .then((res) => {
        if (res.status === 200) {
          navigate(`/cake/${res.data.userId}`);
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            alert('로그인이 필요합니다.');
          }
        }
      });
  }

  useEffect(() => {
    getColors(ownerId);
  }, [ownerId]);

  return (
    <Wrapper>
      <h3>{data.nickname} 님의 케이크</h3>
      <p>친구의 케이크를 꾸며보세요!</p>
      <CakeInfo
        year={data.year}
        sheetColor={cakeColor.sheetColor}
        creamColor={cakeColor.creamColor}
      />
      <Button
        type="default"
        label="케이크 꾸며주기"
        onClick={handleCheckLogin}
      />
      <Button
        type="default"
        label="내 케이크 보러가기"
        onClick={handleNavigateToMyCake}
      />
      <Modal open={open}>
        <span>편지를 작성하면 포인트를 얻을 수 있어요.</span>
        <span>로그인 하시겠어요?</span>
        <Button
          type="default"
          label="로그인하러 가기"
          onClick={() => {
            navigate('/');
          }}
        />
        <Button
          type="default"
          label="괜찮아요"
          onClick={() => {
            navigate(`/letter/choose/${ownerId}`);
          }}
        />
      </Modal>
    </Wrapper>
  );
};

export default SharedCake;
