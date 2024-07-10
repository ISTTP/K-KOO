import React, { useState } from 'react';
import Wrapper from '#components/Wrapper.tsx';
import ColorSelector from '#components/ColorSelector.tsx';
import RenderCake from '#components/RenderCake.tsx';

import { CakeColorType } from '@isttp/types/all';

const CreateCake = () => {
  const [sheetColor, setSheetColor] = useState<CakeColorType>('white');
  const [creamColor, setCreamColor] = useState<CakeColorType>('chocolate');

  return (
    <Wrapper>
      <h1>케이크 만들기</h1>
      <RenderCake sheetColor={sheetColor} creamColor={creamColor} />
      <ColorSelector
        selectedSheet={sheetColor}
        setSelectedSheet={setSheetColor}
        selectedCream={creamColor}
        setSelectedCream={setCreamColor}
      />
    </Wrapper>
  );
};

export default CreateCake;