import React from 'react';
import styled from 'styled-components';
import { CakeColorType } from '@isttp/types/all';

import { BlueberrySheet, BlueberryCream, StrawberryCream } from '#images';

const SvgContainer = styled.div`
  margin-top: 20px;
  width: 200px;
  height: 200px;
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
  white: () => <></>,
  chocolate: () => <></>,
  strawberry: () => <></>,
  banana: () => <></>,
  mint: () => <></>,
  blueberry: BlueberrySheet,
};

const CreamSVG: Record<
  CakeColorType,
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element
> = {
  white: () => <></>,
  chocolate: () => <></>,
  strawberry: StrawberryCream,
  banana: () => <></>,
  mint: () => <></>,
  blueberry: BlueberryCream,
};

const RenderCake: React.FC<RenderedCakeProps> = ({
  sheetColor,
  creamColor,
}) => {
  return (
    <SvgContainer>
      <SvgElement viewBox="0 0 200 200">{SheetSVG[sheetColor]({})}</SvgElement>
      <SvgElement viewBox="0 0 200 200">{CreamSVG[creamColor]({})}</SvgElement>
    </SvgContainer>
  );
};

export default RenderCake;
