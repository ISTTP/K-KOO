import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';

import Button from '#components/Button.tsx';
import Wrapper from '#components/Wrapper.tsx';
import RenderCake from '#components/RenderCake.tsx';
import ColorSelector from '#components/ColorSelector.tsx';

import { CakeColorType } from '@isttp/types/all';

const CreateCake = () => {
  const navigate = useNavigate();
  const [sheetColor, setSheetColor] = useState<CakeColorType>('white');
  const [creamColor, setCreamColor] = useState<CakeColorType>('chocolate');

  async function handleCreateCake() {
    try {
      console.log(sheetColor, creamColor);
      const res = await axiosInstance.post('/cake/color', {
        sheetColor: sheetColor,
        creamColor: creamColor,
      });

      if (res.status === 200) navigate('/cake');
      else throw new Error('케이크 만들기에 실패했습니다.');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      axiosInstance.get('/cake/color').then((res) => {
        if (!res.data.sheetColor || !res.data.creamColor) {
          setSheetColor('white');
          setCreamColor('chocolate');
        }

        setSheetColor(res.data.sheetColor);
        setCreamColor(res.data.creamColor);
      });
    } catch (error) {
      console.log(error);
      // 로그인이 필요합니다 모달 어떤 에러인지에 따라 모달 달리 하기
    }
  }, []);

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
      <Button type="default" label="케이크 만들기" onClick={handleCreateCake} />
    </Wrapper>
  );
};

export default CreateCake;
