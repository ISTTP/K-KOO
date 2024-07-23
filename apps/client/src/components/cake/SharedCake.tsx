import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import CakeInfo from '#components/cake/CakeInfo.tsx';
import Button from '#components/common/Button.tsx';
import Modal from '#components/modal/Modal.tsx';
import LoginModal from '#components/modal/LoginModal.tsx';
import CakeHeader from '#components/cake/CakeHeader.tsx';
import { user } from '@isttp/schemas/all';
import { CakeUserTypeResponse } from '@isttp/types/all';
import { AxiosError } from 'axios';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';

interface MyCakeProps {
  ownerId: string;
  data: CakeUserTypeResponse;
}

const SharedCake: React.FC<MyCakeProps> = ({ ownerId, data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  function handleOpenLogin() {
    setOpenLogin(!openLogin);
  }

  async function handleCheckLogin() {
    try {
      const res = await axiosInstance.get<user>('/user/me');
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
      // 권한 없을 경우 로그인 유도 모달
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            setOpenLogin(true);
          }
        }
      });
  }

  return (
    <InnerWrapper>
      <CakeHeader nickname={data.nickname} isMyCake={false} />
      <CakeInfoWrapper>
        <CakeInfo
          year={data.year}
          sheetColor={data.sheetColor}
          creamColor={data.creamColor}
        />
      </CakeInfoWrapper>
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
          label="그냥 편지 작성하기"
          onClick={() => {
            navigate(`/letter/choose/${ownerId}`);
          }}
        />
        <Button
          type="default"
          label="닫기"
          onClick={() => {
            setOpen(false);
          }}
        />
      </Modal>
      <LoginModal open={openLogin} handleOpen={handleOpenLogin} />
    </InnerWrapper>
  );
};

export default SharedCake;

const CakeInfoWrapper = styled.div`
  pointer-events: none;
`;
