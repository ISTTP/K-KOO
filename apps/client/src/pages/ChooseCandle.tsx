import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import styled from 'styled-components';
import Wrapper from '#components/layout/Wrapper.tsx';
import LoginModal from '#components/modal/LoginModal.tsx';
import { AxiosError } from 'axios';
import { CandleType, CandleResponseType, user } from '@isttp/schemas/all';
import Modal from '#components/modal/Modal.tsx';
import Button from '#components/common/Button.tsx';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';
import ArrowBackIcon from '../assets/icons/ArrowBackIcon';

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
  const [isEnoughPoint, setIsEnoughPoint] = useState<boolean>(false);

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
    try {
      // 선택한 장식초 정보 가져오기
      const candleResponse = await axiosInstance.get<CandleType>(
        `/candle/${candleId}`
      );
      if (candleResponse.status === 200) {
        const data = CandleType.parse(candleResponse.data);
        setCandle(data);

        // 토큰 유효성 확인 후 결제 모달
        const userResponse = await axiosInstance.get<user>('/user/me');
        if (userResponse.status === 200) {
          const point = userResponse.data.point;
          const candlePrice = data.point;
          setUserPoint(point);
          setIsEnoughPoint(point >= candlePrice);
          setOpenBuy(true);
        }
      } else {
        throw new Error('장식초 정보를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      // 권한 없을 경우 로그인 유도 모달
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setOpenLogin(true);
        }
      } else {
        console.error(error);
      }
    }
  }

  async function handleBuyCandle(point: number) {
    try {
      const res = await axiosInstance.post<user>('/candle/purchase', {
        point,
      });
      user.parse(res.data);

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
      <InnerWrapper>
        <NavWrapper>
          <ArrowBackIcon onClick={() => navigate(-1)} />
        </NavWrapper>

        <TitleWrapper>
          <h1>장식초 고르기</h1>
          <h2>케이크를 꾸밀 장식초를 골라주세요❤️</h2>
        </TitleWrapper>

        <CandleContainer>
          {candles?.map((candle, i) => (
            <CandleButton
              key={i}
              onClick={() => {
                if (candle.point === 0) {
                  // 무료 장식초: 편지 페이지로 이동
                  navigate(
                    `/letter/create/${ownerId}?candleId=${candle.candleId}`
                  );
                } else {
                  // 유료 장식초: 결제 혹은 로그인 유도 모달 띄우기
                  openModal(candle.candleId);
                }
              }}
            >
              {candle.point === 0 && <CandleBadge>FREE</CandleBadge>}
              {candle.point !== 0 && <CandleBadge>{candle.point}P</CandleBadge>}
              <CandleImage
                src={candle.imageUrl}
                alt={candle.candleId.toString()}
              />
            </CandleButton>
          ))}
        </CandleContainer>
        <Modal open={openBuy} onClose={handleOpenBuy}>
          <img
            style={{ width: '5rem', height: '5rem' }}
            src={candle?.imageUrl}
            alt={candle?.candleId.toString()}
          />
          <h3 id="modal-title">해당 장식초를 구매하시겠습니까?</h3>
          <span>남은 포인트: {userPoint}P</span>
          <span id="modal-description">결제 포인트: {candle?.point}P</span>
          {!isEnoughPoint && (
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
            <Button type="gray" size="large" onClick={handleOpenBuy}>
              취소
            </Button>
            <Button
              type={isEnoughPoint ? 'default' : 'disabled'}
              size="large"
              onClick={() => {
                setOpenBuy(false);
                handleBuyCandle(candle?.point ? candle.point : 0);
              }}
            >
              구매하기
            </Button>
          </div>
        </Modal>
        <Modal open={openSuccess} onClose={() => setOpenSuccess(false)}>
          <img
            style={{ width: '5rem', height: '5rem' }}
            src={candle?.imageUrl}
            alt={candle?.candleId.toString()}
          />
          <h3 id="modal-title">장식초 구매가 완료되었습니다.</h3>
          <span id="modal-description">남은 포인트: {userPoint}P</span>
          <Button
            type="default"
            onClick={() => {
              navigate(
                `/letter/create/${ownerId}?candleId=${candle?.candleId}`
              );
            }}
          >
            확인
          </Button>
        </Modal>
        <LoginModal open={openLogin} handleOpen={handleOpenLogin} />
      </InnerWrapper>
    </Wrapper>
  );
};

export { ChooseCandle };

const NavWrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const CandleContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  justify-items: center;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
`;

const CandleButton = styled.button`
  position: relative;
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 0.5rem;
  display: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: var(--white);
  border: 1px solid var(--orange-500);
  overflow: hidden;

  &:hover {
    border: 2px solid var(--orange-500);
  }

  @media (max-width: 800px) {
    width: 5.5rem;
    height: 5.5rem;
  }
`;

const CandleImage = styled.img`
  width: 100%;
  height: 100%;
`;

const CandleBadge = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: var(--orange-500);
  color: var(--white);
  padding: 0.2rem 0.5rem;
  border-radius: 0.4rem;
  font-size: 1rem;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  gap: 0.75rem;
`;
