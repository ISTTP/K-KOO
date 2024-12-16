import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CakeHeader from '#components/cake/CakeHeader.tsx';
import CakeInfo from '#components/cake/CakeInfo.tsx';
import LoginModal from '#components/modal/LoginModal.tsx';
import Modal from '#components/modal/Modal.tsx';
import Button from '#components/common/Button.tsx';

import { user } from '@isttp/schemas/all';
import { CakeUserTypeResponse } from '@isttp/types/all';

import { AxiosError } from 'axios';
import axiosInstance from '#apis/axios.ts';

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
    <>
      <CakeHeader nickname={data.nickname} isMyCake={false} />
      {data.isBirthday && <H1>happy birthday!</H1>}
      <CakeInfo
        year={data.year}
        sheetColor={data.sheetColor}
        creamColor={data.creamColor}
        isMyCake={false}
      />
      <Buttons>
        <Button
          type="default"
          onClick={handleCheckLogin}
        >
          케이크 꾸며주기
        </Button>
        <Button
          type="default"
          onClick={handleNavigateToMyCake}
        >
          내 케이크 보러가기
        </Button>
      </Buttons>
      <Modal open={open}>
        <span>편지를 작성하면 포인트를 얻을 수 있어요.{'\n'}로그인 하시겠어요?</span>
        <Button
          type="default"
          onClick={() => {
            navigate('/');
          }}
        >
          로그인하러 가기
        </Button>
        <Button
          type="default"
          onClick={() => {
            navigate(`/letter/choose/${ownerId}`);
          }}
        >
          그냥 편지 작성하기
        </Button>
        <Button
          type="default"
          onClick={() => {
            setOpen(false);
          }}
        >
          닫기
        </Button>
      </Modal>
      <LoginModal open={openLogin} handleOpen={handleOpenLogin} />
    </>
  );
};

export default SharedCake;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  width: 100%;
`
const H1 = styled.h1`
  background: linear-gradient(90deg, #FF3E3E 0%, #582599 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: "sansita";
  font-size: 2.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  margin-top: 2rem;
`;

