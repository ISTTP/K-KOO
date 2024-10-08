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

const baseUrl = 'https://kkoo.s3.ap-northeast-2.amazonaws.com/images/cakes/webp/';

const RenderCake: React.FC<RenderedCakeProps> = ({
  sheetColor,
  creamColor,
  candles,
  handleClick,
}) => {
  sheetColor = sheetColor ?? 'chocolate';
  creamColor = creamColor ?? 'white';
  const sheetSrc300 = baseUrl + '300/sheet_' + sheetColor + '.webp';
  const sheetSrc250 = baseUrl + '250/sheet_' + sheetColor + '.webp';
  const creamSrc300 = baseUrl + '300/cream_' + creamColor + '.webp';
  const creamSrc250 = baseUrl + '250/cream_' + creamColor + '.webp';

  return (
    <SvgContainer>
      <SvgElement
        srcSet={`${sheetSrc250} 250w, ${sheetSrc300} 300w`}
        sizes="(max-width: 800px) 250px, 300px"
        src={sheetSrc300} alt="시트 이미지"
      />
      <SvgElement
        srcSet={`${creamSrc250} 250w, ${creamSrc300} 300w`}
        sizes="(max-width: 800px) 250px, 300px"
        src={creamSrc300} alt="크림 이미지"
      />
      {candles?.map((candle, index) => (
        <Candle
          key={index}
          top={candle.position.top}
          left={candle.position.left}
          onClick={handleClick ? () => handleClick(index) : undefined}
        >
          <CandleImage width={80} height={80} src={candle.candleImageUrl} alt="장식초" />
          <Nickname $creamColor={creamColor}>{candle.nickname}</Nickname>
        </Candle>
      ))}
    </SvgContainer>
  );
};

export default RenderCake;

const SvgContainer = styled.div`
  margin-top: 3rem;
  width: 250px;
  height: 250px;
  position: relative;

  @media (min-width: 801px) {
    width: 300px;
    height: 300px;
  }
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
  font-size: 15px;
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

  @media (min-width: 801px) {
    font-size: 18px;
  }
`;
