import React, { SetStateAction } from 'react';
import styled from 'styled-components';

import { CakeColorType } from '@isttp/types/all';

const ColorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: rgba(222, 222, 222, 0.5);
  padding: 0.6rem;
  border-radius: 0.5rem;
`;

const ColorOption = styled.div<{ $color: string; selected: boolean }>`
  display: flex;
  flex-direction: row; 
  justify-content: center;
  align-items: center; 
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.5rem;
  border-radius: 50%;
  background-color: var(--${(props) => props.$color === 'white' ? 'white' : `${props.$color}-100`});
  cursor: pointer;
  transition: border 0.1s;

  &:hover {
    border: 5px solid var(--${(props) => props.$color === 'white' ? 'gray-400' : `${props.$color}-200`});
  }
  
  @media (max-width: 429px) {
    width: 2rem;
    height: 2rem;
    margin: 0.5rem;
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
        >
          {selectedColor === color && <span>&#10004;</span>}
        </ColorOption>
      ))}
    </ColorContainer>
  );
};

export default ColorSelector;
