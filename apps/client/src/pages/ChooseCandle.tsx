import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import styled from 'styled-components';
import Wrapper from '#components/Wrapper.tsx';
import LoginModal from '#components/modal/LoginModal.tsx';
import { AxiosError } from 'axios';
import { CandleType, CandleResponseType, UserType } from '@isttp/schemas/all';
import Modal from '#components/modal/Modal.tsx';
import Button from '#components/Button.tsx';

const CandleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-items: center;
  align-items: center;
  margin-top: 2rem;
`;

const CandleButton = styled.button`
  position: relative;
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  border-width: 0;
  display: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    border: 2px solid var(--orange-color);
  }
`;

const CandleImage = styled.img`
  width: 100%;
  height: 100%;
`;

const CandleBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--orange-color);
  color: var(--white-color);
  padding: 0.2rem 0.5rem;
  border-radius: 0 0 0 1rem;
`;

async function getCandles() {
  try {
    const res = await axiosInstance.get<CandleResponseType>('/candle');
    CandleResponseType.parse(res.data);
    return res.data;
  } catch (error) {
    return null;
  }
}

const ChooseCandle = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const [openBuy, setOpenBuy] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [candle, setCandle] = useState<CandleType | null>(null);
  const [candles, setCandles] = useState<CandleType[] | null>(null);
  const [userPoint, setUserPoint] = useState<number | null>(null);

  useEffect(() => {
    getCandles().then((data) => setCandles(data));
  }, []);

  function handleOpenBuy() {
    setOpenBuy(!openBuy);
  }

  function handleOpenLogin() {
    setOpenLogin(!openLogin);
  }

  async function openModal(candleId: number) {
    // 선택한 장식초 정보 가져오기
    axiosInstance.get(`/candle/${candleId}`).then((res) => {
      if (res.status === 200) {
        CandleType.parse(res.data);
        setCandle(res.data);
      } else {
        throw new Error('장식초 정보를 가져오는데 실패했습니다.');
      }
    });
    // 토큰 유효성 확인 후 결제 모달
    axiosInstance
      .get('/user/me')
      .then((res) => {
        if (res.status === 200) {
          setUserPoint(res.data.point);
          setOpenBuy(true);
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

  async function handleBuyCandle(point: number) {
    try {
      const res = await axiosInstance.post<UserType>('/candle/purchase', {
        point,
      });
      UserType.parse(res.data);

      if (res.status === 200) {
        setUserPoint(res.data.point);
        setOpenSuccess(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          alert('구매 실패');
        }
      }
    }
  }

  return (
    <Wrapper>
      <h1>장식초 고르기</h1>
      <CandleContainer>
        {candles?.map((candle, i) => (
          <CandleButton
            key={i}
            onClick={() => {
              if (candle.point === 0) {
                // 무료 장식초: 편지 페이지로 이동
                navigate(
                  `/letter/create/${ownerId}?candleId=${candle.candleId}`,
                );
              } else {
                // 유료 장식초: 결제 혹은 로그인 유도 모달 띄우기
                openModal(candle.candleId);
              }
            }}
          >
            {candle.point === 0 && <CandleBadge>free</CandleBadge>}
            {candle.point !== 0 && <CandleBadge>{candle.point}p</CandleBadge>}
            <CandleImage
              src={candle.imageUrl}
              alt={candle.candleId.toString()}
            />
          </CandleButton>
        ))}
      </CandleContainer>
      <Modal open={openBuy}>
        <img
          style={{ width: '5rem', height: '5rem' }}
          src={candle?.imageUrl}
          alt={candle?.candleId.toString()}
        />
        <h3>해당 장식초를 구매하시겠습니까?</h3>
        <span>남은 포인트: {userPoint}P</span>
        <span>결제 포인트: {candle?.point}P</span>
        {userPoint && candle?.point && userPoint < candle?.point && (
          <span style={{ color: 'red' }}>포인트가 부족합니다.</span>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: '1rem',
          }}
        >
          <Button
            type="gray"
            size="large"
            label="취소"
            onClick={handleOpenBuy}
          />
          <Button
            type={
              userPoint && candle?.point && userPoint >= candle?.point
                ? 'default'
                : 'disabled'
            }
            size="large"
            label="구매하기"
            onClick={() => {
              setOpenBuy(false);
              handleBuyCandle(candle?.point ? candle.point : 0);
            }}
          />
        </div>
      </Modal>
      <Modal open={openSuccess}>
        <img
          style={{ width: '5rem', height: '5rem' }}
          src={candle?.imageUrl}
          alt={candle?.candleId.toString()}
        />
        <h3>장식초 구매가 완료되었습니다.</h3>
        <span>남은 포인트: {userPoint}P</span>
        <Button
          type="default"
          label="확인"
          onClick={() => {
            navigate(`/letter/create/${ownerId}?candleId=${candle?.candleId}`);
          }}
        />
      </Modal>
      <LoginModal open={openLogin} handleOpen={handleOpenLogin} />
    </Wrapper>
  );
};

export default ChooseCandle;
