import React from 'react';
import styled from 'styled-components';
import { CakeColorType } from '@isttp/types/all';

import * as Svg from '#images';

type RenderedCakeProps = {
  sheetColor: CakeColorType;
  creamColor: CakeColorType;
  candles?: {
    candleImageUrl: string;
    nickname: string;
    position: { top: number; left: number };
  }[];
  handleClick?: (index: number) => void;
};

const SheetSVG = {
  white: Svg.WhiteSheet,
  chocolate: Svg.ChocoSheet,
  strawberry: Svg.StrawberrySheet,
  banana: Svg.BananaSheet,
  mint: Svg.MintSheet,
  blueberry: Svg.BlueberrySheet,
};

const CreamSVG = {
  white: Svg.WhiteCream,
  chocolate: Svg.ChocoCream,
  strawberry: Svg.StrawberryCream,
  banana: Svg.BananaCream,
  mint: Svg.MintCream,
  blueberry: Svg.BlueberryCream,
};

const RenderCake: React.FC<RenderedCakeProps> = ({
  sheetColor,
  creamColor,
  candles,
  handleClick,
}) => {
  const SheetComponent = SheetSVG[sheetColor];
  const CreamComponent = CreamSVG[creamColor];

  return (
    <SvgContainer>
      <SvgElement as={SheetComponent} />
      <SvgElement as={CreamComponent} />
      {candles?.map((candle, index) => (
        <Candle
          key={index}
          top={candle.position.top}
          left={candle.position.left}
          onClick={handleClick ? () => handleClick(index) : undefined}
        >
          <CandleImage src={candle.candleImageUrl} alt="장식초" />
          <Nickname>{candle.nickname}</Nickname>
        </Candle>
      ))}
    </SvgContainer>
  );
};

export default RenderCake;

const SvgContainer = styled.div`
  margin-top: 20px;
  width: 300px;
  height: 300px;
  position: relative;
`;

const SvgElement = styled.svg`
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

const Nickname = styled.p`
  font-size: 18px;
  color: white;
  font-weight: 700;
`;
