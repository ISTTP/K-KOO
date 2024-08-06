import React from 'react';
import styled from 'styled-components';
import { CakeColorType } from '@isttp/types/all';

type RenderedCakeProps = {
  sheetColor: CakeColorType | null;
  creamColor: CakeColorType | null;
  candles?: {
    candleImageUrl: string;
    nickname: string;
    position: { top: number; left: number };
  }[];
  handleClick?: (index: number) => void;
};

const baseUrl = 'https://kkoo.s3.ap-northeast-2.amazonaws.com/images/cakes/';

const RenderCake: React.FC<RenderedCakeProps> = ({
  sheetColor,
  creamColor,
  candles,
  handleClick,
}) => {
  sheetColor = sheetColor ?? 'chocolate';
  creamColor = creamColor ?? 'white';
  const sheetSrc = baseUrl + 'sheet_' + sheetColor + '.png';
  const creamSrc = baseUrl + 'cream_' + creamColor + '.png';

  return (
    <SvgContainer>
      <SvgElement src={sheetSrc} alt="시트 이미지" />
      <SvgElement src={creamSrc} alt="크림 이미지" />
      {candles?.map((candle, index) => (
        <Candle
          key={index}
          top={candle.position.top}
          left={candle.position.left}
          onClick={handleClick ? () => handleClick(index) : undefined}
        >
          <CandleImage src={candle.candleImageUrl} alt="장식초" />
          <Nickname $creamColor={creamColor}>{candle.nickname}</Nickname>
        </Candle>
      ))}
    </SvgContainer>
  );
};

export default RenderCake;

const SvgContainer = styled.div`
  margin-top: 3rem;
  width: 300px;
  height: 300px;
  position: relative;
`;

const SvgElement = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Candle = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  transform: translate(-50%, -50%);
  text-align: center;
  cursor: pointer;
`;

const CandleImage = styled.img`
  width: 80px;
  height: 80px;
`;

const Nickname = styled.p<{ $creamColor: CakeColorType }>`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -2px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100px;
  color: ${({ $creamColor }) =>
    $creamColor === 'white' || $creamColor === 'banana'
      ? 'var(--black)'
      : 'var(--white)'};
`;
