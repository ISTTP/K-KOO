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

const SheetSVG: Record<
  CakeColorType,
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element
> = {
  white: Svg.WhiteSheet,
  chocolate: Svg.ChocoSheet,
  strawberry: Svg.StrawberrySheet,
  banana: Svg.BananaSheet,
  mint: Svg.MintSheet,
  blueberry: Svg.BlueberrySheet,
};

const CreamSVG: Record<
  CakeColorType,
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element
> = {
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
  return (
    <SvgContainer>
      <SvgElement>{SheetSVG[sheetColor]({})}</SvgElement>
      <SvgElement>{CreamSVG[creamColor]({})}</SvgElement>
    </SvgContainer>
  );
};

export default RenderCake;
