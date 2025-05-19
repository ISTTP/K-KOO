import React, { SetStateAction } from 'react';
import * as C from '#styles/CakeStyle.tsx';
import { CakeColorType } from '@isttp/types/all';

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
    <C.ColorContainer>
      {colors.map((color, index) => (
        <C.ColorOption
          key={index}
          $color={color}
          selected={selectedColor === color}
          onClick={() => setSelectedColor(color)}
        >
          {selectedColor === color && <span>&#10004;</span>}
        </C.ColorOption>
      ))}
    </C.ColorContainer>
  );
};

export default ColorSelector;
