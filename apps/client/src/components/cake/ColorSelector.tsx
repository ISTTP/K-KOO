import React, { SetStateAction } from 'react';
import styled from 'styled-components';

import { CakeColorType } from '@isttp/types/all';

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
  background-color: var(--${(props) => props.$color});
  border: ${(props) =>
    props.selected ? '5px solid var(--orange-500)' : '5px solid transparent'};
  cursor: pointer;
  transition: border 0.3s;

  &:hover {
    border: 5px solid var(--orange-100);
  }
`;

type ColorSelectorProps = {
  selectedColor: string | null;
  setSelectedColor: React.Dispatch<SetStateAction<CakeColorType>>;
};

const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColor,
  setSelectedColor,
}: ColorSelectorProps) => {
  const colors: CakeColorType[] = [
    'white',
    'chocolate',
    'strawberry',
    'banana',
    'mint',
    'blueberry',
  ];

  return (
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
  );
};

export default ColorSelector;
