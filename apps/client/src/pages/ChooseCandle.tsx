import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import styled from 'styled-components';
import Wrapper from '#components/Wrapper.tsx';
import { CandleType, CandleResponseType } from '@isttp/schemas/all';

const CandleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-items: center;
  align-items: center;
  margin-top: 2rem;
`;

const CandleButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  border-width: 0;
  display: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 5px 0 var(--orange-color);
  }
`;

const CandleImage = styled.img`
  width: 100%;
  height: 100%;
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
  //const [senderInfo, setSenderInfo] = useState<UserType | null>(null);
  const [candles, setCandles] = useState<CandleType[] | null>(null);

  useEffect(() => {
    getCandles().then((data) => setCandles(data));
  }, []);

  // 포인트로 결제 기능 구현 필요

  return (
    <Wrapper>
      <h1>장식초 고르기</h1>
      <CandleContainer>
        {candles?.map((candle, i) => (
          <CandleButton
            key={i}
            onClick={() => {
              // 무료 장식초라면 바로 편지 페이지로 이동
              if (candle.point === 0) {
                navigate(
                  `/letter/create/${ownerId}?candleId=${candle.candleId}`,
                );
                // 유료 장식초라면 모달 띄우기
              } else {
                alert('포인트 결제 기능 준비중');
              }
            }}
          >
            <CandleImage
              src={candle.imageUrl}
              alt={candle.candleId.toString()}
            />
          </CandleButton>
        ))}
      </CandleContainer>
    </Wrapper>
  );
};

export default ChooseCandle;
