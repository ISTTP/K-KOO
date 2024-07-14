import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import styled from 'styled-components';
import Wrapper from '#components/Wrapper.tsx';

const CandleButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 2rem;
  display: relative;
  overflow: hidden;
`;

const CandleImage = styled.img`
  width: 100%;
  height: 100%;
`;

async function getCandles() {
  try {
    const res = await axiosInstance.get('/candles');
    return res.data;
  } catch (error) {
    return null;
  }
}

type CandleData = {
  id: number;
  imageUrl: string;
  point: number;
}[];

const ChooseCandle = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const [candles, setCandles] = useState<CandleData | null>(null);

  useEffect(() => {
    getCandles().then((data) => setCandles(data));
  }, []);

  // 포인트로 결제 기능 구현 필요

  return (
    <Wrapper>
      <h1>편지지 고르기</h1>
      {candles?.map((candle) => (
        <CandleButton
          key={candle.id}
          onClick={() =>
            navigate(`/letter/create/${ownerId}?candle=${candle.id}`)
          }
        >
          <CandleImage src={candle.imageUrl} alt={candle.id.toString()} />
        </CandleButton>
      ))}
    </Wrapper>
  );
};

export default ChooseCandle;
