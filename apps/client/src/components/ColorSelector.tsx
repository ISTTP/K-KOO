import React, { SetStateAction, useState } from 'react';
import styled from 'styled-components';

import { CakeColorType } from '@isttp/types/all';

const Title = styled.h2`
  display: flex;
  gap: 20px;
  font-size: 24px;
`;

const Button = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  font-size: 24px;
  color: ${(props) =>
    props.$active ? 'var(--orange-color)' : 'var(--dark-gray-color)'};
  cursor: pointer;
  outline: none;

  &:hover {
    color: #ff7043;
  }
`;

const ColorContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #e8e8e8;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const ColorOption = styled.div<{ $color: string; selected: boolean }>`
  width: 60px;
  height: 60px;
  margin: 10px;
  border-radius: 50%;
  background-color: var(--${(props) => props.$color}-color);
  border: ${(props) =>
    props.selected ? '5px solid #FF7043' : '5px solid transparent'};
  cursor: pointer;
  transition: border 0.3s;

  &:hover {
    border: 5px solid #ff7043;
  }
`;

type ColorSelectorProps = {
  selectedSheet: string | null;
  setSelectedSheet: React.Dispatch<SetStateAction<CakeColorType>>;
  selectedCream: string | null;
  setSelectedCream: React.Dispatch<SetStateAction<CakeColorType>>;
};

const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedSheet,
  setSelectedSheet,
  selectedCream,
  setSelectedCream,
}) => {
  const [mode, setMode] = useState<'sheet' | 'cream'>('sheet');

  const colors: CakeColorType[] = [
    'white',
    'chocolate',
    'strawberry',
    'banana',
    'mint',
    'blueberry',
  ];

  const selectedColor = mode === 'sheet' ? selectedSheet : selectedCream;
  const setSelectedColor =
    mode === 'sheet' ? setSelectedSheet : setSelectedCream;

  return (
    <>
      <Title>
        <Button $active={mode === 'sheet'} onClick={() => setMode('sheet')}>
          시트
        </Button>
        <Button $active={mode === 'cream'} onClick={() => setMode('cream')}>
          크림
        </Button>
      </Title>
      <ColorContainer>
        {colors.map((color, index) => (
          <ColorOption
            key={index}
            $color={color}
            selected={selectedColor === color}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </ColorContainer>
    </>
  );
};

export default ColorSelector;
