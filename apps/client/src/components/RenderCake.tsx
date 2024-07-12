import React from 'react';
import styled from 'styled-components';
import { CakeColorType } from '@isttp/types/all';

import * as Svg from '#images';

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

type RenderedCakeProps = {
  sheetColor: CakeColorType;
  creamColor: CakeColorType;
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
}) => {
  const SheetComponent = SheetSVG[sheetColor];
  const CreamComponent = CreamSVG[creamColor];

  return (
    <SvgContainer>
      <SvgElement as={SheetComponent} />
      <SvgElement as={CreamComponent} />
    </SvgContainer>
  );
};

export default RenderCake;
